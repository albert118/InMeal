using InMeal.Core.DTOs;
using InMeal.Infrastructure.Interfaces.DataServices;
using InMeal.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace InMeal.Upcoming;

[ApiController]
[Route("api/[controller]")]
public class UpcomingController
{
    private readonly IAsyncRecipeRepository _repository;
    private readonly ICancellationTokenAccessor _tokenAccessor;

    public UpcomingController(IAsyncRecipeRepository repository, ICancellationTokenAccessor tokenAccessor)
    {
        _repository = repository;
        _tokenAccessor = tokenAccessor;
    }

    [HttpPost(Name = "Upcoming Recipes")]
    public List<UpcomingRecipe> Post()
    {
        // TBD for testing, will implement a service to handle this behaviour
        var recipeIds = new List<Guid> {
            Guid.Parse("2b271329-83dc-4123-be11-f1ac96873868"),
            Guid.Parse("4cf33993-777f-497d-b007-4f2e333e2dca"),
            Guid.Parse("918e8444-db04-452d-a40d-295039fbdf93"),
            Guid.Parse("c24e6841-c919-4c49-b283-2d10697216f6"),
            Guid.Parse("ea7ca771-889c-4e53-ae88-e2b11a2c20ee")
        };

        var ct = _tokenAccessor.Token;
        var task = _repository.GetRecipesAsync(recipeIds, ct);
        task.Wait(ct);

        if (task.Result.Count == 0)
            return new();

        return task.Result.Select(RecipeMapper.ToUpcoming).ToList();
    }
}
