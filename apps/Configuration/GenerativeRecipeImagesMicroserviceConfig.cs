namespace Configuration;

/// <summary>
/// 
/// </summary>
/// <param name="ServiceUrl">The address of the microservice (proto://host:port</param>
/// <param name="ProxyPath">The path to provide to downstream consumers in-front of the proxy (/proxy-path)</param>
/// <param name="Timeout"></param>
public record GenerativeRecipeImagesMicroserviceConfig(Uri ServiceUrl, string ProxyPath, TimeSpan Timeout);