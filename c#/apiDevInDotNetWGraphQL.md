# [API Development in .NET with GraphQL Notes](https://www.lynda.com/NET-tutorials/API-Development-NET-GraphQL/664823-2.html)

## .NET

### Model

data objects, per table

### Service

- 'worker'
- persister/retriever of data (check if LINQ namespace is used in service layer)
- business logic here
- uses backend data to mutate request data and create a response for the controller to send back
- services are registered with interfaces and then injected into parent `GraphQL.NET` classes
- IOC may be done with `Unity` or `Ninject`

## GraphQL

### `using GraphQL.Types`

- namespace of classes that are used to define Schema types

### Schema

- there is a correspondence between model classes and schema classes
- contains fields and references types
- these classes typically end in `Type.cs` to not confuse with models
- GraphiQL (graphical) uses this to see what types are available
- these types can be registered in the in the IOC container
- IOC is done with `GraphQL.NET`

### IoC

- Type Resolution
  - the Schema class implements the .NET Core `IServiceProvider` interface
  - `GraphType` is resolved transiently (lifetime of `Schema`)
  - the `GetService` method in `IServiceProvider` accepts a service type argument which is required to have a public parameterless constructor
- Type Registration
  - a .NET Core's `ServiceCollection` (dependency collection) is injected into the `Startup` class
    - `services` is our collection
    - `services.AddSingleton<T>();` registers type `T` with a `singleton` (initial request, termination of app) lifecycle/disposition, `AddSingleton` is part of the .NET Core IoC Container disposition layer
    - tricky: the `GraphQL.NET` IoC architecture is built here
      - the dependency resolver (`IServiceProvider`) must be registered here as well (or else you will get errors at runtime)
        - this will resolve/provide all of our registered types to `GraphQL.NET`
        - `FuncServiceProvider` provides a service instance for any GraphQL objects which depend on it
          - this calls `GetRequiredService` type which is part of .NET Core's resolution layer 

### ObjectGraph\<T\>

- defines GraphQL types using the `Field` method
  - the `Field` method accepts a lambda which exposes a field
  - there is also a `Field\<T\>` method which is used to expose entire subgraphs or child field objects
    - the first argument is a string which defines a new property
    - a resolver must be defined which uses the injected service
    - these subgraphs appear as new properties that don't exist in the models
- `GraphQL.NET` allows us to map GraphQL types to our native classes
- `ObjectGraph` is a generic class and `<T>` is a the syntax for defining a type parameter `T`
- `T` represents our model, this pulls from the `Orders.Models` namespace

### ListGraph\<T\>

- exposes collections

### CompleteGraphType\<T\>

- helps define fields on GraphQL types

### EnumerationGraphType

- gives us a way to define GraphQL first class enums
