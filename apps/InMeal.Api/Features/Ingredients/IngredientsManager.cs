using System.Data;
using Configuration;
using InMeal.Api.DTOs.Ingredients;
using InMeal.Api.Mappers;
using InMeal.Core.Entities;
using InMeal.Core.Enumerations;
using InMeal.Infrastructure.Interfaces.DataServices;
using InMeal.Infrastructure.Interfaces.External.GenerativeRecipeImages;
using InMeal.Infrastructure.Interfaces.QueryServices;

namespace InMeal.Api.Features.Ingredients;

public interface IIngredientsManager
{
    Task<List<Ingredient>> GetIngredientsAsync(int? skip, int? take, CancellationToken ct);
    
    Task<List<IngredientDetailDto>> GetIngredientDetailAsync(List<IngredientId> ids, CancellationToken ct);

    Task EditAsync(EditIngredientDto dto, CancellationToken ct);
    
    Task<Dictionary<string, List<AlphabeticallyIndexedIngredientDto>>> GetUsagesSortedAlphabeticallyAsync(CancellationToken ct);

    Task<List<Ingredient>> AddAndGetExistingAsync(IEnumerable<string> names, CancellationToken ct);

    Task DeleteAsync(List<IngredientId> ids, CancellationToken ct);
    
    List<MeasurementUnit> GetMeasurementOptions();
}

public class IngredientsManager : IIngredientsManager
{
    private const int DefaultTake = 25;
    private readonly IAsyncIngredientRepository _ingredientRepository;
    private readonly ILogger<IngredientsManager> _logger;
    private readonly IGenerativeRecipeImages _generativeRecipeImages;
    private readonly IAsyncRecipeIngredientQueryService _recipeIngredientQueryService;

    public IngredientsManager(IAsyncIngredientRepository ingredientRepository,
        IAsyncRecipeIngredientQueryService recipeIngredientQueryService, ILogger<IngredientsManager> logger,
        IGenerativeRecipeImages generativeRecipeImages)
    {
        _ingredientRepository = ingredientRepository;
        _recipeIngredientQueryService = recipeIngredientQueryService;
        _logger = logger;
        _generativeRecipeImages = generativeRecipeImages;
    }

    public async Task<List<Ingredient>> GetIngredientsAsync(int? skip, int? take, CancellationToken ct)
    {
        var ingredients = await _ingredientRepository.GetManyAsync(skip ?? 0, take ?? DefaultTake, ct);

        return ingredients;
    }

    public async Task<List<IngredientDetailDto>> GetIngredientDetailAsync(List<IngredientId> ids, CancellationToken ct)
    {
        var usageCountResults = await _recipeIngredientQueryService.GetIngredientUsageCountAsync(ids, ct);
        var ingredients = await _ingredientRepository.GetManyAsync(ids, ct);

        return ingredients.Select(i => i.ToDto(usageCountResults)).ToList();
    }

    public async Task EditAsync(EditIngredientDto dto, CancellationToken ct)
    {
        var key = new IngredientId(dto.IngredientId);
        var ingredient = await _ingredientRepository.GetAsync(key, ct) 
            ?? throw new DataException($"no {nameof(Ingredient)} was found with the given ID '{key}'");

        // only update what's changed
        if (dto.NewName != null) {
            var isUnique = await _ingredientRepository.IsIngredientNameUnique(dto.NewName, ct);
            if (!isUnique) throw new IngredientUniqueNameException($"An ingredient should have a unique name ('{dto.NewName}' has already been used)");
            ingredient.UpdateName(dto.NewName);
        }
        if (dto.NewUnit != null) ingredient.UpdateMeasurement(dto.NewUnit.Value);

        await _ingredientRepository.UpdateAsync(ingredient, ct);
    }

    public async Task<Dictionary<string, List<AlphabeticallyIndexedIngredientDto>>> GetUsagesSortedAlphabeticallyAsync(CancellationToken ct)
    {
        var indexedIngredients = await _ingredientRepository.GetManyOrderedAlphabeticallyAsync(ct);

        var usageCountResults = await _recipeIngredientQueryService.GetIngredientUsageCountAsync(ct);

        var content = _generativeRecipeImages.GetRandomImage()
                                             .GetAwaiter()
                                             .GetResult();

        // merge results with the mapper
        return indexedIngredients.Count == 0
            ? new()
            : IngredientMapper.MapToAlphabeticallyIndexedIngredientsDto(indexedIngredients, usageCountResults, content.Url);
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

    public async Task DeleteAsync(List<IngredientId> ids, CancellationToken ct)
    {
        // check if they exist
        var existingIngredients = await _ingredientRepository.GetManyAsync(ids, ct);

        if (existingIngredients.Count != ids.Count) {
            _logger.LogWarning("cannot remove {Ingredient}(s) with given Ids '{IngredientIds}' as they may not exist", nameof(Ingredient), ids);
            throw new IngredientDeletionException($"cannot remove {nameof(Ingredient)}s that may not exist");
        }

        var usageCountResults = await _recipeIngredientQueryService.GetIngredientUsageCountAsync(ct);
        var usedIngredients = usageCountResults.Keys.ToHashSet().Intersect(ids);

        if (usedIngredients.Any()) {
            _logger.LogWarning("cannot remove {Ingredient}(s) used by recipes with Ids '{IngredientIds}'", nameof(Ingredient), usedIngredients);
            throw new IngredientDeletionException($"cannot remove {nameof(Ingredient)}s that are still in use");
        }

        _logger.LogInformation("removing unused {Ingredient}(s) with Ids '{IngredientIds}'", nameof(Ingredient), usedIngredients);
        await _ingredientRepository.DeleteManyAsync(ids, ct);
    }

    public List<MeasurementUnit> GetMeasurementOptions()
    {
        return Enum.GetValues<MeasurementUnit>().Where(e => e != MeasurementUnit.Unknown).ToList();
    }
}