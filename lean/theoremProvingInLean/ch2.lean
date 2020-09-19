/- let m, n ∈ ℕ in set theory -/
constants m n : ℕ
#check m
#check n
#check 2 + n
#check tt || ff
#eval tt || ff
/- functional -/
/- takes in f: ℕ → ℕ and outputs ℕ -/
constant F : (ℕ → ℕ) → ℕ 
/- F ∘ f or F(f) -/
/- composition vs. application of functions?-/
/- constant p : ℕ × ℕ 
/- extractions (projections) -/
#check p.1
#check p.2 -/
constant G : ℕ → (ℕ → ℕ) → ℕ
#check G m
constant H : bool → ℕ 
#check H (tt || ff) /- : ℕ -/
constant curried : ℕ → (ℕ → ℕ)
constant notCurried : nat × nat → nat
#check curried
#check notCurried
constants α β : Type
/- #check α β  Type error -/
/- T accepts a Type -/
/- then returns a function that accepts a Type-/
constant T : Type → Type → ℕ
#check T α β /- not a Type error -/
#check α×β
#check prod α β
#check list α 
#check Type 0
#check Type
/- the type of a product is the Type μ, -/
/- where μ is the max of both type levels -/
/- what is a type anyway? -/
#check prod
constant Q : α → β → α
constant Q' : (α → β) → α
constant a : α 

#check λ x : ℕ , x + 5            
constant R : α → β
/- x↦ Rx-/
#check λ x : α, R x
constants a1 a2 : α
constants b1 b2 : β

constant f : α → α 
constant g : α → β
/- h takes in a variable of type α -/
/- and outputs a function -/
constant h : α → β → α
#check λ x : α , h x b2
constant p : α → α → bool

#check λ φ : α → β , φ a1 
#eval (λ x : ℕ , x + 5) 6
#eval (λ φ : ℕ → ℕ, φ 2 ) (λ n : ℕ, n + 3)
constant N : ℕ → bool
#eval ((λ B : bool, (λ n : ℕ, B) )tt)2
#eval (λ N : ℕ → bool, N 2) (λ n : ℕ , tt)
def foo : (ℕ → ℕ) → ℕ := λ f, f 0
/- we can now prove things with foo -/
/- from the 0, Lean can tell that -/
/- the domain of f is ℕ, but it cannot -/
/- tell what the codomain is -/
def foo' := λ f : ℕ → ℕ , f 0
/- Lean can infer the type of the output
 here because ℕ is closed under multiplication-/
def square (x : ℕ) := x*x
def double (x : ℕ) : ℕ := 2*x
def do_twice : (ℕ → ℕ) → ℕ → ℕ := 
    λ f x, f (f x)
def multiply_8 (x : ℕ) := x*8
#reduce multiply_8 9
#check sorry
def ex_2_6_1 : (ℕ → ℕ) :=  
    (λ x , multiply_8 ((do_twice double) x))
#reduce ex_2_6_1 1
#reduce ex_2_6_1 2
#reduce ex_2_6_1 3
#reduce ex_2_6_1 4
#reduce (λ x, double x)2
#reduce (λ x, double(double x))2
#reduce (λ x, double(double(double x)))2
#reduce (λ x, double(double(double(double x))))2
#reduce (λ x, (do_twice double)(double(double x)))2
#reduce (λ x, (do_twice double) ((do_twice double)x))2
#reduce (λ x, (λ φ : (ℕ → ℕ) → ℕ → ℕ , (φ double) ((φ double)x))do_twice)2
def Do_Twice : ((ℕ → ℕ) → ℕ → ℕ) → (ℕ → ℕ) → (ℕ → ℕ) := 
(λ φ : (ℕ → ℕ) → ℕ → ℕ , 
(λ f : ℕ → ℕ ,
(λ x : ℕ , 
(φ f) ((φ f x)))
))
#reduce Do_Twice do_twice double 2

