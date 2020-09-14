# [Understanding Dependency Injection in .NET Core](https://auth0.com/blog/dependency-injection-in-dotnet-core/)

## Dependency Inversion Principle

- Higher level classes should not depend on lower level classes
- Both classes should depend on interfaces

## Inversion of Control (IoC)

- way to apply Dependency Inversion Principle
- aka the _Hollywood Principle_: "don't call us we'll call you", i.e., the higher level class will call an interface to the lower level component

## Dependency Injection

- higher level constructor/method/property accepts interface instance of lower level class

### .NET Core

Comes with a built-in IoC container with the following:

- **Resolution**: instantiates objects and injects, or _provides_, it to the requesting class (resolvers resolve, providers provide)
- **Registration**: tells IoC which types to instantiate for resolution
  - this is done for services using the `ConfigureServices()` method in the `Startup` class
    - `ConfigureServices` injects an `IServiceCollection` object which allows us to register service types (dependencies) and manage disposition
- **Disposition**: dependency lifetime management, i.e., when to instantiate and dispose (beginning, end):

  - Singleton: (initial request, termination of app)
  - Transient: (request, termination of parent instance)
  - Scoped: (HTTP request, HTTP response)

IoC containers implement the `IServiceProvider` interface. The dependencies managed by these containers are called services. Recall that controllers (managers) depend on services (workers).
