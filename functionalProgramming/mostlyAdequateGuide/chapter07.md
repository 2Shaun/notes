```
// ((b,a) -> b) -> b -> [a] -> b
// reducer -> init -> actions -> new
const reduce = curry((f, x, xs) => xs.reduce(f,x));
```
