# [Unit Testing: MOQ Framework](https://www.youtube.com/watch?v=dZ2Psa_Bn2Q)

`Mock` objects allow you to add a proxy (representative)  to an dependency interface and define its input/output without implementation.

## Testing an API
Suppose a controller depends on a repository (service) via dependency injection, call it `Repo`. You can add a `Mock` proxy around `IRepo` which define the methods based solely on input and output without worrying about implementation (how).
This allows you to not have to worry about any database records which the repository typically must serve.  
`Setup` allows you to define the output of one function of the interface that is mocked (expectation). Typically, each arrange section focuses on one test case. Thus, the domain and range of the mocked interface method are singleton sets. Sometimes it's helpful to set the domain to a Type and the range to a specific value. Most of the time, if your system your testing has a helper method, you don't care about the parameter of the helper method, so you can use `It.IsAny<Type>()` and just set the output that you want. If the method is called with an input not in your defined mock domain, whether your mock is "loose" or "strict" will decide the behavior here:

- Loose mocks return default
- Strict mocks throw exceptions

```C#
// Arrange
var customer = new Customer(
    Id = 12;
    Name = "Fred Flinstone";
)
var mock = new Mock<IRepo>;
mock.Setup(x => x.Find(id)).Returns(customer);

//Act
var controller = new TestController(mock.Object);
```

`SetupSequence` allows you to iterate over IDs and define more than one output. In this case, the cardinality of the domain of the interface method is as many iterables there are.

`Verify` allows you to check how many times methods of the `Mock` object that you are passing (as a dependency) to the test function are called. `Verify` takes in the integer for which to assert that the method was only called that many times, e.g., a `Mock` logger that is verified that its error logging function was never called.

`Raise` allows you to raise mock events. This can then be used with `Verify` to check if a method was called by the event handler which catches the mock event. This mock event can be dispatched when a helper method is called (with `Setup`).

## Mocking concrete classes

Classes are hardcoded to behave a certain way, so you cannot override the interface methods to do what you want. there is a solution to this: virtual methods in your class you intend to mock.