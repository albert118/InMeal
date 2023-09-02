using System.Data;
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

    Task EditAsync(EditIngredientDto dto, CancellationToken ct);
    
    Task<Dictionary<string, List<AlphabeticallyIndexedIngredientDto>>> GetUsagesSortedAlphabeticallyAsync(
        CancellationToken ct);

    Task<List<Ingredient>> AddAndGetExistingAsync(IEnumerable<string> names, CancellationToken ct);

    Task DeleteAsync(IngredientId id, CancellationToken ct);
    
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

    public async Task EditAsync(EditIngredientDto dto, CancellationToken ct)
    {
        var key = new IngredientId(dto.IngredientId);
        var ingredient = await _ingredientRepository.GetAsync(key, ct) 
            ?? throw new DataException($"no {nameof(Ingredient)} was found with the given ID '{key}'");

        // only update what's changed
        if (dto.NewName != null) {
            var isExisting = await _ingredientRepository.IsIngredientNameUnique(dto.NewName, ct);
            if (isExisting) throw new IngredientUniqueNameException($"An ingredient should have a unique name ('{dto.NewName}' has already been used)");
            ingredient.UpdateName(dto.NewName);
        }
        if (dto.NewUnit != null) ingredient.UpdateMeasurement(dto.NewUnit.Value);

        await _ingredientRepository.UpdateAsync(ingredient, ct);
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

    public async Task DeleteAsync(IngredientId id, CancellationToken ct)
    {
        var usageCountResults = await _recipeIngredientQueryService.GetIngredientUsageCount(ct);
        var isUsed = usageCountResults.TryGetValue(id, out _);

        if (isUsed) {
            _logger.LogWarning("cannot remove {Ingredient}(s) used by recipes with Ids '{IngredientIds}'", nameof(Ingredient), id);
            throw new IngredientDeletionException($"cannot remove {nameof(Ingredient)}s used by existing recipes");
        }

        await _ingredientRepository.DeleteAsync(id, ct);
    }

    public List<MeasurementUnit> GetMeasurementOptions()
    {
        return Enum.GetValues<MeasurementUnit>().Where(e => e != MeasurementUnit.Unknown).ToList();
    }
}