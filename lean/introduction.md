# Introduction

Lean is based on a version of a  logical system called _Calculus of Constructions_ with _inductive types_

# Simple Type Theory

- **every** expression has a type
- in Lean, `#` represents a query to the system for information
- lean is a foundational system, i.e., it _defines_ but does not _postulate_ ("axiomize")
- `(α → β) → α` IS NOT `α → β → α`
- the notation `prod α β` more clearly illustrates that `prod` is of Type `Type → Type → Type` since the output, `α⨯β`, is itself a `Type`
- `Prop : Type`
- `Type = Type 0`
  - `Type` is a universe of "small" or "ordinary" types
- `Type : Type 1`
- `Type 1 : Type 2`
- `Type 2 : Type 3`
- `Type 3 : Type 4` and so on...
- `list` is _polymorphic_ over type universes, i.e., `list α` works for any type `α`
  - polymorphic seems to mean something that can range (vary) over type universes
    - thinking about an endofunctor like `(Type _ → Type *) ⟿ (Type f(_) → Type f(*))` where `f : nat -> nat`
      - here I abuse notation to represent the category **Type Universes** as `Type _ → Type *`
- `_` represents a variable ranging over type levels, so `Type _ → Type _`, takes in an expression of type `Type _` and outputs another expression of `Type _` (remember it's possible that `Type _` is `Type`)
- an advantage of dependent type theory is the ability to create type constructors as instances of mathematical functions
- lambda functions allow you to temporarily postulate a variable to construct an expression
  - `λ x : nat, x + 5`

## Symbol Shortcuts

- `\r →`
  - r for right arrow
- `\o ∘`
- `\x ⨯`
- range over types
  - `\a α`
  - `\b β`
  - `\g γ`

- a free variable is something that is undefined or not bound to a set.
- there is no ambient state in lean
  - computation is simply evaluation of instructions