using InMeal.Core.Globalisation;
using System.Data;

namespace InMeal.Infrastructure;

public static class EmptyGuidGuard
{
    public static void Apply(IEnumerable<Guid> data)
    {
        if (data.Any(e => e.IsEmpty())) {
            throw new DataException(
                "Empty GUIDs ('00000000-0000-0000-0000-000000000000') are not valid in this context");
        }
    }
}
