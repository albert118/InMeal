using InMeal.Core.Globalisation;

namespace InMeal.Core.Entities;

public class Ingredient : IHaveName
{
    public Guid Id { get; set; }

    public string Name { get; set; }
}
