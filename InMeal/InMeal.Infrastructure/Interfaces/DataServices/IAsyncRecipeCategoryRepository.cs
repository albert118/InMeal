using InMeal.Core.DTOs;
using InMeal.Core.Entities;

namespace InMeal.Infrastructure.Interfaces.DataServices;

public interface IAsyncRecipeCategoryRepository
{
    Task<List<RecipeCategory>> GetRecipeCategoriesAsync(int skip, int take, CancellationToken ct);

    Task<Guid?> AddRecipeCategoryAsync(AddRecipeCategoryDto dto, CancellationToken ct);
}
