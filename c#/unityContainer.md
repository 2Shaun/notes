# [Unity Container](https://www.tutorialsteacher.com/ioc/unity-container)


Driver Class
```c#
public class Driver
{
    private ICar _car = null;

    public Driver(ICar car)
    {
        _car = car
    }
}
```
Manual Injection  
`Driver driver = new Driver(new BMW())`

Instead of manual injection, the Unity container can be used.

## Register and Resolve
The Unity container can be instantiated in the following ways

`IUnityContainer container = new UnityContainer();`  
or  
`var container = new UnityContainer();`

- RegisterTypes
  - so Unity knows which class to instantiate for a give interface
  - `container.RegisterType<ICar, BMW>();`
    - requests Unity to create an object of the `BMW` class and inject it through a constructor whenever you need to inject an object of `ICar`
  - `var driver = container.Resolve<Driver>();`
    - recall `Driver` uses constructor injection with the `ICar` interface. Since `RegisterType` maps `ICar` to `BMW`, the `container` method `Resolve<Driver>` instantiates a `BMW` object with the `ICar`  

```C#
[InjectionConstructor]
public Driver(ICar car)
{
    _car = car;
}

public Driver(string name)
{
}
```

The `InjectionConstructor` attribute tells which constructor Unity should call when resolving the `Driver` class.
