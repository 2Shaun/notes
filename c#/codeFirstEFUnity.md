# [Code First Approach using Entity Framework 4.1, Inversion of Control, Unity Framework, Repository & Unit of Work Pattern and MVC3 Razor View](https://www.codeproject.com/Articles/547016/Code-First-Approach-using-Entity-Framework-Inv)

## Questions

1. how is architecture decoupled?
2. service based?
3. where to put entities/models?
4. how to communicate with database?

## Architecture
database  
 ⭥  
data ⭤ entities  
 ⭥  
services  
 ⭥  
 view  
Notice that services do not interact directly with the entity classes, but via IoC, with the data itself.
### Data Layer
- contains `DbContext` derived classes
  - Wrapper around entity layer that handles mapping them together
- Factory pattern, calls different contructors based on type
  - Data layer has instaces of model classes

### Entities Layer

- Entity classes
  - name of class ⭤ database table
  - property ⭤ column
  - relations and SQL type constraints
  - creating entity classes first represents a code first approach

### View Layer

- Model Classes
  - Sent to View layer (React, Blazor, etc.)
  - Populated by controllers
- Controllers
  - handle HTTP requests
  - (EF?) Framework maps URLs to methods in these classes
    - Services are injected into this layer such that controllers do not have direct access to service instances (Unity handles this)
  - populates forms 