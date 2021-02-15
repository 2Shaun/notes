[Documentation](https://sanctuary.js.org/)

- currying is necessary, of the form `f (x) (y) (z)`, and no partial application such as `f (x,y) (z)`
- functions in Sanctuary are defined for all possible inputs
- Sanctuary does not support [transducers](https://en.wikipedia.org/wiki/Finite-state_transducer)
- `fantasy-land/map` for the `Maybe` type is written `map :: Maybe a ~> (a -> b) -> b`, where `~>` represents the type in which `map` is called from
- `isLeft :: Either a ~> Boolean` represents a property of the `Either` type which is a boolean
- `Functor f => a -> b -> f a -> f b` means that `f` MUST be of type `Functor` (typeclass)
  - lowercase letters represent type variables, but they may be constrained to a particular typeclass
