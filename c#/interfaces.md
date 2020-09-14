# [Interfaces](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/interfaces/)

- may contain instance methods, properties, events, indexes, or any combination of the four
- may also contain static constructors, fields, constants, or operators
  - Fields
    - the class's properties that implement the interface may declare getter and setter accessors
- must **not** _declare_ instance data, i.e., instance fields, instance constructors, finalizers, auto-implemented properties, or property-like events
- a class may implement multiple interfaces but may only inherit from one base (child) class
  - parent classes _inherit_ the base class's implementation
  - a class may be implicitly converted to the derived interface or any of its base interfaces
  - a derived class may reimplement (override) any of the base class's implemented members
- an interface may inherit from one or more interfaces
- members are public by default

## methods

- must be implemented
- do not have instructions (implementation). interfaces are an _abstraction_. they may however define a default implementation

## misc

