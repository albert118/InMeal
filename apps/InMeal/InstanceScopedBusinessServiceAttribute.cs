namespace InMeal;

/// <summary>
///     Tag a service implementation for registration as an instance scoped service
/// </summary>
[AttributeUsage(AttributeTargets.Class)]
public class InstanceScopedBusinessServiceAttribute : Attribute { }