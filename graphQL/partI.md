# Part I

- Not trying to sell GraphQL
  - alternative, not replacement to REST 
- Explore it in front of you, provide you with examples and what I've learned
- Ultimately up to you to decide if it fits your use case

# What GraphQL Addresses

- Discoverability
  - I didn't know what a REST API was until maybe 3 weeks into my SM career when Alex showed me Insomnia
    - felt like I discovered a new world, but thinking back it was really discovering a maze
  - I didn't feel fully comfortable navigating this landscape until AJ showed me Swagger
  - notice both 3rd party tools, not built into the architecture itself
- Type Safety
- Ease of Development
  - Things to think about if your company has a high turn over rate of devs, skill of devs, or is growing its dev capacity
- Cost Efficiency
  - dev/maitanence cost
  - cost of change

# GraphQL (anti-)qualities over REST

- one endpoint (url) 
  - Ben and a few other sources told me that this can also be solved with REST + Microservices
- flexible data structures defined client side (filtered in response body)
  - great for rapid iterative development, if you're not sure what the user will want
  - client-side changes without touching BE
    - Modifiable queries
- Contract driven
  - Strong type system
    - BE/FE know the structure of data
      - work independently, DX
    - aligns with the Typescript initiative Ben is pushing
  - forced to develop the schema or database blueprint first
- Self documentation built in
  - DX
  - (swagger)
- No built in caching
- Queries can scale to be complicated
  - monolithic schema => monolithic documentation
  - you can granularize the queries/mutations
    - `assessmentByID`, `assessmentByEmail`

## ExecuteAsync

- populates options
- options is an instance of `ExecutionOptions`
  - Schema
    - define our types
      - responsible for type checking, validation
    - define our resolvers
      - service method calls
  - Query (user request)
    - two uses of the word "Query"
      - the type which we define what we will accept from the client

- in the "code first" approach, the schema is generated from the root `Query` class
  - each **document**, a `string` user request,(sometimes called a query, but that is confusing bc) takes slices from the `Query` class that they want

      - we create new types that have a correspondence with models
        - these new types may have nested models, but eventually are defined fully with scalar types (strings, ints, etc.)
- fragments can be used to save specific fields that are used:
```
fragment comparisonFields on Demographic {
  firstName
  lastName
  age
} 
```
- have to ask for a leaf node, no `SELECT *`
  - you know which FE components are using which fields