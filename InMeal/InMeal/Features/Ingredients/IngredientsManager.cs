using System.Data;
using System.Diagnostics.Metrics;
using InMeal.Core.Entities;
using InMeal.Core.Enumerations;
using InMeal.DTOs.Ingredients;
using InMeal.Infrastructure.Interfaces.DataServices;
using InMeal.Infrastructure.Interfaces.QueryServices;
using InMeal.Mappers;

namespace InMeal.Features.Ingredients;

public interface IIngredientsManager
{
    Task<List<Ingredient>> GetIngredientsAsync(int? skip, int? take, CancellationToken ct);

    Task UpdateNameAsync(IngredientId id, string newName, CancellationToken ct);

    Task<Dictionary<string, List<AlphabeticallyIndexedIngredientDto>>> GetUsagesSortedAlphabeticallyAsync(
        CancellationToken ct);

    Task<List<Ingredient>> AddAndGetExistingAsync(IEnumerable<string> names, CancellationToken ct);

    Task DeleteManyAsync(IEnumerable<IngredientId> ids, CancellationToken ct);
    
    List<MeasurementUnit> GetMeasurementOptions();
}

[InstanceScopedBusinessService]
public class IngredientsManager : IIngredientsManager
{
    private const int DefaultTake = 25;
    private readonly IAsyncIngredientRepository _ingredientRepository;
    private readonly ILogger<IngredientsManager> _logger;
    private readonly IAsyncRecipeIngredientQueryService _recipeIngredientQueryService;

    public IngredientsManager(IAsyncIngredientRepository ingredientRepository,
        IAsyncRecipeIngredientQueryService recipeIngredientQueryService, ILogger<IngredientsManager> logger)
    {
        _ingredientRepository = ingredientRepository;
        _recipeIngredientQueryService = recipeIngredientQueryService;
        _logger = logger;
    }

    public async Task<List<Ingredient>> GetIngredientsAsync(int? skip, int? take, CancellationToken ct)
    {
        var ingredients = await _ingredientRepository.GetManyAsync(skip ?? 0, take ?? DefaultTake, ct);

        return ingredients;
    }

    public async Task UpdateNameAsync(IngredientId id, string newName, CancellationToken ct)
    {
        var ingredient = await _ingredientRepository.GetAsync(id, ct) 
            ?? throw new DataException($"no {nameof(Ingredient)} was found with the given ID '{id.Key}'");

        ingredient.UpdateName(newName);
        await _ingredientRepository.UpdateAsync(new List<Ingredient> { ingredient }, ct);
    }

    public async Task<Dictionary<string, List<AlphabeticallyIndexedIngredientDto>>> GetUsagesSortedAlphabeticallyAsync(
        CancellationToken ct)
    {
        var indexedIngredients = await _ingredientRepository.GetManyOrderedAlphabeticallyAsync(ct);

        var usageCountResults = await _recipeIngredientQueryService.GetIngredientUsageCount(ct);

        // merge results with the mapper
        return indexedIngredients.Count == 0
            ? new()
            : IngredientMapper.MapToAlphabeticallyIndexedIngredientsDto(indexedIngredients, usageCountResults);
    }

    public async Task<List<Ingredient>> AddAndGetExistingAsync(IEnumerable<string> names, CancellationToken ct)
    {
        var standardisedNames = IngredientNameGuard.Apply(names);

        var existingIngredients = await _ingredientRepository.GetManyAsync(standardisedNames, ct);
        var ingredientNamesToBeAdded = standardisedNames.Except(existingIngredients.Select(i => i.Name)).ToList();

        // skip adding any new ingredients, as we have persisted them all already
        if (!ingredientNamesToBeAdded.Any()) return existingIngredients;

        var newIngredients = ingredientNamesToBeAdded.Select(n => new Ingredient(n)).ToList();
        await _ingredientRepository.AddManyAsync(newIngredients, ct);

        // return all of the existing ingredients
        existingIngredients.AddRange(newIngredients);

        return existingIngredients;
    }

    public async Task DeleteManyAsync(IEnumerable<IngredientId> ids, CancellationToken ct)
    {
        var usageCountResults = await _recipeIngredientQueryService.GetIngredientUsageCount(ct);

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

    public List<MeasurementUnit> GetMeasurementOptions()
    {
        return Enum.GetValues<MeasurementUnit>().ToList();
    }
}