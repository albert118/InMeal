using InMeal.Core.DTOs;
using InMeal.Core.Entities;
using InMeal.Infrastructure.Interfaces.DataServices;
using InMeal.Mappers;

namespace InMeal.Features;

public interface IIngredientsManager
{
    Task<List<Ingredient>> GetIngredientsAsync(int? skip, int? take, CancellationToken ct);

    Task UpdateNameAsync(IngredientId id, string newName, CancellationToken ct);

    Task<Dictionary<string, List<AlphabeticallyIndexedIngredientDto>>> GetUsagesSortedAlphabeticallyAsync(CancellationToken ct);

    Task<List<Ingredient>> AddAndGetExistingAsync(IEnumerable<string> names, CancellationToken ct);

    Task DeleteManyAsync(IEnumerable<IngredientId> ids, CancellationToken ct);
}

[InstanceScopedBusinessService]
public class IngredientsManager : IIngredientsManager
{
    private readonly IAsyncIngredientRepository _ingredientRepository;
    private readonly IAsyncRecipeIngredientRepository _recipeIngredientRepository;
    private readonly ILogger<IngredientsManager> _logger;

    private const int DefaultTake = 25;
    
    public IngredientsManager(IAsyncIngredientRepository ingredientRepository, IAsyncRecipeIngredientRepository recipeIngredientRepository, ILogger<IngredientsManager> logger)
    {
        _ingredientRepository = ingredientRepository;
        _recipeIngredientRepository = recipeIngredientRepository;
        _logger = logger;
    }

    public async Task<List<Ingredient>> GetIngredientsAsync(int? skip, int? take, CancellationToken ct)
    {
        var ingredients = await _ingredientRepository.GetManyAsync(skip ?? 0, take ?? DefaultTake, ct);

        return ingredients;
    }

    public Task UpdateNameAsync(IngredientId id, string newName, CancellationToken ct)
    {
        return _ingredientRepository.UpdateNameAsync(id, newName, ct);
    }

    public async Task<Dictionary<string, List<AlphabeticallyIndexedIngredientDto>>> GetUsagesSortedAlphabeticallyAsync(CancellationToken ct)
    {
        var indexedIngredients = await _ingredientRepository.GetManyOrderedAlphabeticallyAsync(ct);

        var usageCountResults = await _recipeIngredientRepository.GetIngredientUsageCount(ct);

        // merge results with the mapper
        return indexedIngredients.Count == 0
            ? new()
            : indexedIngredients.MapToAlphabeticallyIndexedIngredientsDto(usageCountResults);
    }

    public async Task<List<Ingredient>> AddAndGetExistingAsync(IEnumerable<string> names, CancellationToken ct)
    {
        var standardisedNames = IngredientNameGuard.Apply(names);

        var existingIngredients = await _ingredientRepository.GetManyAsync(standardisedNames, ct);
        var ingredientNamesToBeAdded = standardisedNames.Except(existingIngredients.Select(i => i.Name)).ToList();

        // skip adding any new ingredients, as we have persisted them all already
        if (!ingredientNamesToBeAdded.Any()) {
            return existingIngredients;
        }

        var newIngredients = ingredientNamesToBeAdded.Select(n => new Ingredient(n)).ToList();
        await _ingredientRepository.AddManyAsync(newIngredients, ct);
        
        // return all of the existing ingredients
        existingIngredients.AddRange(newIngredients);

        return existingIngredients;
    }

    public async Task DeleteManyAsync(IEnumerable<IngredientId> ids, CancellationToken ct)
    {
        var usageCountResults = await _recipeIngredientRepository.GetIngredientUsageCount(ct);
        
        if (usageCountResults.Any(e => e.Value > 0)) {
            var ingredientsInUse = string.Join(", ", usageCountResults.Keys.ToList());
            _logger.LogWarning("cannot remove {Ingredient}(s) used by recipes with Ids '{IngredientIds}'",
                nameof(Ingredient),
                ingredientsInUse
            );
            throw new IngredientDeletionException($"cannot remove {nameof(Ingredient)}s used by existing recipes");
        }
        
        await _ingredientRepository.DeleteManyAsync(ids, ct);
    }
}

public class IngredientDeletionException : ApplicationException
{
    public IngredientDeletionException(string message) : base(message) { }
}

public static class IngredientNameGuard
{
    public static List<string> Apply(IEnumerable<string> names)
    {
        return names
               .Where(n => !string.IsNullOrEmpty(n))
               .EnforceLowercaseNames()
               .EnforceUniqueNames()
               .EnsureNoExcessWhitespace()
               .ToList();
    }

    private static IEnumerable<string> EnforceLowercaseNames(this IEnumerable<string> values) =>
        values.Select(v => v.ToLowerInvariant());

    private static IEnumerable<string> EnforceUniqueNames(this IEnumerable<string> values) => values.Distinct();
    
    private static IEnumerable<string> EnsureNoExcessWhitespace(this IEnumerable<string> values) => values.Trim();
}