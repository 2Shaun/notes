// f is the function to be curried
/*
let curry = (f) => {
  const arity = f.length;
  // we return a new function which accepts arguments by piecemeal
  if curry is called on a multi-argument function more than once
  the `f` of all previous will be overwritten by the last,
  because this is an arrow function which doesn't preserve
  context
  return (curryHelper = (...piecemealArgs) =>
    /*
    this new function will have all previous args prepended
    to its args if we have not received all of the arguments
    asked for by f
    once you've received all the args, call f with them
    */
/*
    piecemealArgs.length < arity
      ? curryHelper.bind(null, ...piecemealArgs)
      : f.call(null, ...piecemealArgs));
};
*/

export function curry(fn) {
  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}

const multiply = (x, y) => x * y;
const add = (x, y) => x + y;
const divideSecondByFirst = (x, y) => y / x;
export const increment = curry(add)(1);
const double = curry(multiply)(2);
const halve = curry(divideSecondByFirst)(2);
const reduce = curry((reducer, init, array) => array.reduce(reducer, init));
const keepHighest = (x, y) => (x >= y ? x : y);
/*
max is point-free because it does not reference
its parameter in the definition
*/
const max = reduce(keepHighest)(-Infinity);
console.log("the max is", max([1, 2, 3, 4, 88, 9, 100, 2]));
const matchToBeCurried = (what, s) => s.match(what);
const filterToBeCurried = (fn, xs) => xs.filter(fn);

const match = curry(matchToBeCurried);
const filter = curry(filterToBeCurried);

const matchQ = match(/q/i);
const test = "hello";
const filterQs = filter(matchQ);
const words = ["hello", "world", "qwerty", "test", "quail"];
//console.log(words.filter(matchQ));
console.log(filterQs(["hello", "world", "qwerty", "test", "quail"]));
//console.log(filter(matchQ)(["hello", "world", "qwerty", "test", "quail"]));

/*
const compose = (...fns) => {
  let retVal = (x) => x;
  let prevRetVal = null;

  for (let i = fns.length - 1; i >= 0; i--) {
    /*
    this doesn't work because recursion is allowed in javascript
    retVal = (x) => fns[i](retVal(x));
    */
/* 
   this still recurs
    prevRetVal = retVal.bind(null);
    retVal = (x) => fns[i](prevRetVal(x));
    console.log(`retVal(1) at ${i}`, retVal(1));
  }
  */

/*
lesson learned: you can use reduce to build functions
*/
const composeReducer = (acc, curr) => (x) => curr(acc(x));

export const compose = (...fns) => fns.reduceRight(composeReducer);

const doubleThenIncrement = compose(increment, double);
const incrementThenDouble = compose(double, increment);
const quadrupleThenIncrement = compose(increment, double, double);
const halveThenDouble = compose(double, halve);
const split = (delim, str) => str.split(delim);
const splitBySpaces = curry(split)(" ");
