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
- lambda abstraction
  - `\la` $\lambda$

- a free variable is something that is undefined or not bound to a set.
- there is no ambient state in lean
  - computation is simply evaluation of instructions
- Given $f:\alpha\rightarrow\beta$, we can _apply_ $f$ and obtain $f\alpha : \beta$.
- The companion to application is _abstraction_. we can postulate a variable (assume the existence of) $x:\alpha$ and an expression $t:\beta$. Then, by the power of lambda abstraction, $\lambda x:\alpha ,t$ is an "object" of type $\alpha\rightarrow\beta$. This maps any $\alpha$, call it $x$, to $t$.
  - `fun x : \a, t`
  - note that after a variable is postulated, $\lambda x:\alpha$, it may be used as type $\alpha$ in the expression following the comma
  
- the notational difference between a constant and a variable is the following
  - constant a : $\alpha$
  - $\lambda x : \alpha$
- if the functions used in the expression have defined types, the type of the postulated variable can be inferred by Lean. Suppose $\textup{dom}f=\alpha$ (abuse of notation, not sure what difference between Types and Sets are).
  - $\lambda x:\alpha, fx = \lambda x, fx$
- $\lambda x:\alpha$ is _abstracting_ over $\alpha$
- expressions which are the same but have bound variables that are named differently are called $\alpha$-equivalent
- normalization - notion of reduction
- expressions which reduce to a common term are called $\beta$-equivalent
- there are two types of evaluation in Lean
  - `#reduce` kernel evaluation
    - produces type correct terms at each step
    - part of the trusted computing base
    - small
    - reliable
  - `#eval` bytecode evaluation
    - fast
    - efficient
    - liberal
    - type and propositional information is erased
    - can be used for complex programs
- dependent types
  - suppose $\alpha(n)$ is the Type containing all arrays of length $n$
  - dependent function ($\forall$)
    - the return type of a dependent function could be $\alpha(n)$, where $n$ is an argument given to the function of type $\N$
    - notice how here $n$ ranges over $\N$
  - dependent pair ($\exists$)
    - $(n, \alpha(n))$
    - here there is one specific $n$
- Lean was designed to define objects and prove things with them