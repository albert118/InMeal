using System.Data;
using InMeal.Core.Entities;
using InMeal.Core.Enumerations;
using InMeal.Core.Mementos;
using InMeal.Infrastructure.Interfaces.Data;
using InMeal.Infrastructure.Interfaces.DataServices;
using InMeal.Infrastructure.IQueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace InMeal.Infrastructure.Repositories;

public class AsyncRecipeRepository : IAsyncRecipeRepository
{
    private readonly ILogger<AsyncRecipeRepository> _logger;
    private readonly IRecipeDbContext _recipeDbContext;

    public AsyncRecipeRepository(IRecipeDbContext recipeDbContext, ILogger<AsyncRecipeRepository> logger)
    {
        _recipeDbContext = recipeDbContext;
        _logger = logger;
    }

    public async Task UpdateRecipesAsync(List<Recipe> recipes, CancellationToken ct)
    {
        EmptyGuidGuard.Apply(recipes.Select(r => r.Id.Key));

        _recipeDbContext.Recipes.UpdateRange(recipes.Select(r => r.State));
        await _recipeDbContext.SaveChangesAsync(ct);
    }

    public async Task<RecipeId?> AddRecipeAsync(Recipe recipe, CancellationToken ct)
    {
        EmptyGuidGuard.Apply(recipe.RecipeIngredients.Select(identity => identity.Id.Key));

        try {
            await _recipeDbContext.Recipes.AddAsync(recipe.State, ct);
            await _recipeDbContext.SaveChangesAsync(ct);
        } catch (Exception ex) {
            _logger.LogError(ex, "an error occured while saving a recipe");
            return null;
        }

        return recipe.Id;
    }

    public async Task<Dictionary<MealCourse, List<Recipe>>> GetManyGroupedByMealCourseAsync(bool includeArchived, CancellationToken ct)
    {
        List<RecipeMemento> mementos; 
        
        if (includeArchived) {
            mementos = await _recipeDbContext.Recipes
             .IncludeArchived()
             .Include(e => e.RecipeIngredients)
             .Include(e => e.Category)
             .ToListAsync(ct);
        } else {
            mementos  = await _recipeDbContext.Recipes
              .ExcludeArchived()
              .Include(e => e.RecipeIngredients)
              .Include(e => e.Category)
              .ToListAsync(ct);
        }

        if (!mementos.Any()) return new Dictionary<MealCourse, List<Recipe>>();

        return mementos
               .GroupBy(e => e.CourseType)
               .ToDictionary(grp => grp.Key, grp => grp.Select(Recipe.FromMemento).ToList());
    }

    public async Task<List<Recipe>> GetAllArchivedRecipesAsync(int take, int skip, CancellationToken ct)
    {
        var mementos = await _recipeDbContext.Recipes
            .IncludeArchived()
            .Skip(skip)
            .Take(take)
            .ToListAsync(ct);

        return mementos.Select(Recipe.FromMemento).ToList();
    }

    public async Task<List<Recipe>> GetRecipesAsync(IEnumerable<RecipeId> ids, CancellationToken ct)
    {
        var keys = ids.Select(identity => identity.Key).Distinct().ToList();
        EmptyGuidGuard.Apply(keys);

        var mementos = await _recipeDbContext.Recipes
            .Where(r => keys.Contains(r.Id))
            .ExcludeArchived()
            .ToListAsync(ct);

        return mementos.Select(Recipe.FromMemento).ToList();
    }

    public async Task<Recipe?> GetRecipeAsync(RecipeId id, CancellationToken ct)
    {
        var memento = await _recipeDbContext.Recipes
                                            .Include(e => e.RecipeIngredients)
                                            .ThenInclude(e => e.Ingredient)
                                            .Include(e => e.Category)
                                            .ExcludeArchived()
                                            .SingleOrDefaultAsync(r => r.Id == id.Key, ct);

        return memento == null ? null : Recipe.FromMemento(memento);
    }

    public async Task<Recipe> EditRecipeAsync(Recipe recipe, CancellationToken ct)
    {
        EmptyGuidGuard.Apply(recipe.RecipeIngredients.Select(identity => identity.Id.Key));

        var existingRecipe = await _recipeDbContext.Recipes
                                                   .Include(e => e.RecipeIngredients)
                                                   .ThenInclude(e => e.Ingredient)
                                                   .Include(e => e.Category)
                                                   .ExcludeArchived()
                                                   .SingleOrDefaultAsync(r => r.Id == recipe.Id.Key, ct)
            ?? throw new DataException($"cannot find the given {nameof(Recipe)} with Id '{recipe.Id}'");

        try {
            _recipeDbContext.Entry(existingRecipe).CurrentValues.SetValues(recipe.State);

            //////////////////////////////
            // handle the category
            //////////////////////////////

            if (recipe.Category != null && existingRecipe.Category == null) {
                _recipeDbContext.RecipeCategories.Add(recipe.Category.State);
            } else if (recipe.Category != null && existingRecipe.Category != null) {
                existingRecipe.Category.UpdateFrom(recipe.Category);
                _recipeDbContext.RecipeCategories.Update(existingRecipe.Category);
            } else {
                // this path is simply for completeness when consuming the, DTOs
                // the frontend currently sets every new recipe to have "unknown" as a default rather than null
                // this may change in the future or may be different for other API consumers
                _recipeDbContext.RecipeCategories.Remove(existingRecipe.Category!);
            }

            //////////////////////////////
            // handle the ingredients
            //////////////////////////////

            // remove any existing that aren't incoming
            var removedKeys = existingRecipe.RecipeIngredients.Select(e => e.Id).Except(recipe.RecipeIngredients.Select(e => e.Id.Key));
            foreach (var removedKey in removedKeys) {
                var toRemove = existingRecipe.RecipeIngredients.Single(e => e.Id == removedKey);
                _recipeDbContext.RecipeIngredients.Remove(toRemove);
            }
            
            // update any existing keys with the latest data from incoming
            var updatedKeys = recipe.RecipeIngredients.Select(e => e.Id.Key).Intersect(existingRecipe.RecipeIngredients.Select(e => e.Id));
            var updatedValues = recipe.RecipeIngredients.Where(e => updatedKeys.Contains(e.Id.Key)).Select(ri => ri.State);
            foreach (var updatedValue in updatedValues) {
                var toUpdate = existingRecipe.RecipeIngredients.Single(ri => ri.Id == updatedValue.Id);
                toUpdate.UpdateFrom(updatedValue);
                _recipeDbContext.RecipeIngredients.Update(toUpdate);
            }

            // add everything else
            var additionalKeys = recipe.RecipeIngredients.Select(e => e.Id.Key).Except(existingRecipe.RecipeIngredients.Select(e => e.Id));
            foreach (var addedKey in additionalKeys) {
                var toAdd = recipe.RecipeIngredients.Single(d => d.Id.Key == addedKey);
                _recipeDbContext.RecipeIngredients.Add(toAdd.State);
            }

            await _recipeDbContext.SaveChangesAsync(ct);
        } catch (Exception ex) {
            _logger.LogError(ex, "an error occured while editing an existing recipe");
        }

        return recipe;
    }

    public async Task ArchiveRecipesAsync(IEnumerable<RecipeId> ids, CancellationToken ct)
    {
        var keys = ids.Select(identity => identity.Key).Distinct().ToList();
        EmptyGuidGuard.Apply(keys);

        var recipesToArchive = await _recipeDbContext.Recipes
            .Where(r => keys.Contains(r.Id))
            .ExcludeArchived()
            .ToListAsync(ct);

        foreach (var recipe in recipesToArchive) {
            recipe.IsArchived = true;
        }
        
        await _recipeDbContext.SaveChangesAsync(ct);
    }

    public async Task RestoreRecipesAsync(IEnumerable<RecipeId> ids, CancellationToken ct)
    {
        var keys = ids.Select(identity => identity.Key).Distinct().ToList();
        EmptyGuidGuard.Apply(keys);

        var recipesToRestore = await _recipeDbContext.Recipes
                                                     .Where(r => keys.Contains(r.Id))
                                                     .IncludeArchived()
                                                     .ToListAsync(ct);

        foreach (var recipe in recipesToRestore) {
            recipe.IsArchived = false;
        }
        
        await _recipeDbContext.SaveChangesAsync(ct);
    }

    public async Task<bool> IsRecipeTitleUnique(string title, CancellationToken ct)
    {
        var countWithGivenName = await _recipeDbContext.Recipes
            .Where(r => r.Title == title)
            .ExcludeArchived()
            .CountAsync(ct);

        return countWithGivenName == 0;
    }
}
