# [Official Typescript Docs](typescriptlang.org)

- `interface`s enforce you to define each property and type match
- type `any` tells compiler to ignore variable
    - without `strictNullCheck`, the types `undefined` and `null` are treated like `any`
- inline types are anonymous types
```
let o: {
    propOne: string,
    propTwo: boolean,
}
```
- angle brackets, `<T>`, define a type parameter to be used in the rest of the expression
```
function lastElement<T>(arr: T[]): T {
    let retVal: T;

    arr.forEach(x => { retVal = x; });

    return retVal;
}
```

## [Typescript Deep Dive](https://basarat.gitbook.io/typescript/)