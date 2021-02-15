# [What is JSX?](https://kentcdodds.com/blog/what-is-jsx)

## [Introducing JSX]()

- Babel compiles HTML-like syntax into calls to `React.createElement`. `React.createElement` returns a simple object that encodes a DOM node. this can then be passed into `ReactDOM.render`
- `{}` must contain one javascript expression because they are used as assignments and function arguments of say `React.createElement`
- when JSX gets confusing, you can run it in [Babel's REPL](https://babeljs.io/repl)
- still want to learn how JSX/ReactDOM prevents XSS

```
const response = {
  potentiallyMaliciousInput: <script></script>
};

const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```
