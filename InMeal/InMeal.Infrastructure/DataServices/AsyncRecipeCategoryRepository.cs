using InMeal.Core.DTOs;
using InMeal.Core.Entities;
using InMeal.Infrastructure.Data.RecipesDb;
using InMeal.Infrastructure.Interfaces.DataServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace InMeal.Infrastructure.DataServices;

[InstanceScopedService]
public class AsyncRecipeCategoryRepository : IAsyncRecipeCategoryRepository
{
    private readonly ILogger<AsyncRecipeCategoryRepository> _logger;
    private readonly RecipeDbContext _recipeDbContext;

    public AsyncRecipeCategoryRepository(RecipeDbContext recipeDbContext, ILogger<AsyncRecipeCategoryRepository> logger)
    {
        _recipeDbContext = recipeDbContext;
        _logger = logger;
    }

    public Task<List<RecipeCategory>> GetRecipeCategoriesAsync(int skip, int take, CancellationToken ct)
    {
        return _recipeDbContext.RecipeCategories
            .OrderBy(i => i.Category)
            .Skip(skip)
            .Take(take)
            .ToListAsync(ct);
    }

    public async Task<Guid?> AddRecipeCategoryAsync(AddRecipeCategoryDto dto, CancellationToken ct)
    {
        var newRecipeCategory = new RecipeCategory {
            Category = dto.RecipeCategory,
            RecipeId = dto.RecipeId
        };

        try {
            await _recipeDbContext.RecipeCategories.AddAsync(newRecipeCategory, ct);
            await _recipeDbContext.SaveChangesAsync(ct);
        } catch (Exception ex) {
            _logger.LogError(ex, "an error occured while saving a {RecipeCategory}", nameof(RecipeCategory));
            return null;
        }

        return newRecipeCategory.Id;
    }

    public async Task<bool> DeleteRecipeCategoriesByRecipeIdAsync(List<Guid> recipeIds, CancellationToken ct)
    {
        EmptyGuidGuard.Apply(recipeIds);

        var recipeCategoryIds = await _recipeDbContext.RecipeCategories
            .Where(rc => recipeIds.Contains(rc.RecipeId))
            .Select(rc => rc.Id)
            .ToListAsync(ct);

        try {
            _recipeDbContext.RecipeCategories.RemoveRange(
                recipeCategoryIds.Select(id => new RecipeCategory() {Id = id})
            );
            await _recipeDbContext.SaveChangesAsync(ct);
        } catch (Exception ex) {
            _logger.LogError(ex, "an error occured removing {RecipeCategory}", nameof(RecipeCategory));
            return false;
        }

        return true;
    }
}
