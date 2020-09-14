# Introduction

Lean is based on a version of a  logical system called _Calculus of Constructions_ with _inductive types_

# Simple Type Theory

- **every** expression has a type
- in Lean, `#` represents a query to the system for information
- lean is a foundational system, i.e., it _defines_ but does not _postulate_ ("axiomize")
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
    - thinking about a functor (?) `F` like `(Type u_1 → Type u_2) ⟿ (Type F(u_1) → Type F(u_2))`
- `u_1` represents a variable ranging over type levels, so `Type u_1 → Type u_1`, takes in an expression of type `Type u_1` and outputs another expression of `Type u_1` (remember it's possible that `Type u_1` is `Type`)

## Symbol Shortcuts

- `\r →`
  - r for right arrow
- `\o ∘`
- `\x ⨯`
- range over types
  - `\a α`
  - `\b β`
  - `\g γ`
