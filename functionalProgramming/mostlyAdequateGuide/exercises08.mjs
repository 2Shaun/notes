import { curry, compose, increment } from "./exercises04.mjs";
import { readFile } from "fs";
import { throws } from "assert";

const inspect = (x) => {
  if (x && typeof x.inspect === "function") {
    return x.inspect();
  }

  function inspectFn(f) {
    return f.name ? f.name : f.toString();
  }

  function inspectTerm(t) {
    switch (typeof t) {
      case "string":
        return `'${t}'`;
      case "object": {
        const ts = Object.keys(t).map((k) => [k, inspect(t[k])]);
        return `{${ts.map((kv) => kv.join(": ")).join(", ")}}`;
      }
      default:
        return String(t);
    }
  }

  function inspectArgs(args) {
    return Array.isArray(args)
      ? `[${args.map(inspect).join(", ")}]`
      : inspectTerm(args);
  }

  return typeof x === "function" ? inspectFn(x) : inspectArgs(x);
};

const prop = curry((key, obj) => obj[key]);

class Container {
  constructor(x) {
    this.$value = x;
  }

  static of(x) {
    return new Container(x);
  }

  map(fn) {
    return Container.of(fn(this.$value));
  }
}

console.log("---point scope test---");
let o = { x: 1, y: 2 };
let g = (obj) => Container.of(prop("x")(obj)).map((_) => obj);
console.log(g(o));

class Maybe {
  static of(x) {
    return new Maybe(x);
  }

  get isNothing() {
    return this.$value == null;
  }

  constructor(x) {
    this.$value = x;
  }

  map(fn) {
    return this.isNothing ? this : Maybe.of(fn(this.$value));
  }
}

class IO {
  // IO.of(x) will create a 0-ary function that returns x
  static of(x) {
    return new IO(() => x);
  }
  /*
             compose 
        f     --->      g∘f
new IO  |      new IO   | 
        v    map        v
        {f}   --->      {g∘f} 

  */
  // new IO on the other hand will accept an n-ary function
  constructor(fn) {
    this.$value = fn;
  }

  // notice that fn does not run
  // it's similar to stacking dominos without calling them
  map(fn) {
    return new IO(compose(fn, this.$value));
  }

  inspect() {
    return `IO(${inspect(this.$value)})`;
  }
}

// i don't think an arrow function is appropriate here
// because they have no this
Container.prototype.map = function (f) {
  return Container.of(f(this.$value));
};

console.log(Container.of("hotdogs"));

class Either {
  static of(x) {
    return new Right(x);
  }

  constructor(x) {
    this.$value = x;
  }
}

class Left extends Either {
  get isLeft() {
    return true;
  }

  get isRight() {
    return false;
  }

  static of(x) {
    throw new Error(
      "`of` called on class Left (value) instead of Either (type)"
    );
  }

  /*
  [util.inspect.custom]() {
    return `Left(${inspect(this.$value)})`;
  }
  */

  map(f) {
    return this;
  }

  ap() {
    return this;
  }

  chain() {
    return this;
  }

  join() {
    return this;
  }

  sequence(of) {
    return of(this);
  }

  traverse(of, fn) {
    return of(this);
  }

  inspect() {
    return `Left(${inspect(this.$value)})`;
  }
}

class Right extends Either {
  map(f) {
    return Either.of(f(this.$value));
  }

  inspect() {
    return `Right(${inspect(this.$value)})`;
  }
}

class Task {
  constructor(fork) {
    this.fork = fork;
  }

  /*
  [util.inspect.custom]() {
    return "Task(?)";
  }
  */

  static rejected(x) {
    return new Task((reject, _) => reject(x));
  }

  // ----- Pointed (Task a)
  static of(x) {
    return new Task((_, resolve) => resolve(x));
  }

  // ----- Functor (Task a)
  map(fn) {
    return new Task((reject, resolve) =>
      this.fork(reject, compose(resolve, fn))
    );
  }

  // ----- Applicative (Task a)
  ap(f) {
    return this.chain((fn) => f.map(fn));
  }

  // ----- Monad (Task a)
  chain(fn) {
    return new Task((reject, resolve) =>
      this.fork(reject, (x) => fn(x).fork(reject, resolve))
    );
  }

  join() {
    return this.chain(identity);
  }
}

const trace = curry((tag, x) => {
  console.log(tag, x);
  return x;
});

const changeCase = curry((cse, str) =>
  cse === "upper" ? str.toUpperCase() : str.toLowerCase()
);

const toUpperCase = (str) => str.toUpperCase;

const left = (x) => new Left(x);

let printValue = compose(trace("value"), prop("$value"));

trace("either")(Either.of("test").map(changeCase("upper")));

/*
since Left extends Either, Left.of just constructs a Right
to make a real Left, I have to call new Left
trace("left")(Left.of("left").map(changeCase("upper")));
*/
trace("left")(left("left").map(changeCase("upper")));

/*
const getAge = curry((now, user) => {
  const birthDate = moment(user.birthDate, "YYYY-MM-DD");

  return birthDate.isValid()
    ? Either.of(now.diff(birthDate, "years"))
    : left("Birth date could not be parsed");
});

trace("getAge correct")(getAge(moment(), { birthDate: "1992-03-04" }));

trace("getAge incorrect")(getAge(moment(), { birthDate: "March 4, 1992" }));
*/

//const url = IO.of(window.location.href);

const map = curry((f, x) => x.map(f));
const append = curry((str1, str2) => str2.concat(str1));
const prepend = curry((str1, str2) => str1.concat(str2));
const exercise0801 = map(increment);
const testContainer = new Container(2);
console.log(exercise0801(testContainer));

const safeProp = curry((p, obj) => compose(Maybe.of, prop(p))(obj));
const head = (xs) => xs[0];

const user2 = { id: 2, name: "Albert", active: true };
const user3 = { id: 3, name: "Tom", active: false };

/* 
this is bad because it doesn't use point-free style
notice the `.` in .map
console.log(safeProp("name")(user).map(head));
*/
compose(console.log, map(head), safeProp("name"))(user2);

const checkActive = function checkActive(user) {
  return user.active ? Either.of(user) : left("Your account is not active");
};

// User -> String
const showWelcome = compose(prepend("Welcome "), prop("name"));
compose(console.log, map(showWelcome), checkActive)(user2);
compose(console.log, map(showWelcome), checkActive)(user3);

/*
user is in scope here because i'm within the scope of (validate, user) =>
*/
// (User -> Either String ()) -> User -> Either String User
const validateUser = curry((validate, user) => validate(user).map((_) => user));
// User -> IO User
const save = (user) => new IO(() => ({ ...user, saved: true }));

const greaterThanX = curry((x, str) => str.length > x);
const greaterThan3 = greaterThanX(3);
const userGreaterThan3 = compose(greaterThan3, prop("name"));
// User -> Either String ()
const validateName = function validateName(user) {
  return userGreaterThan3(user)
    ? Either.of(null)
    : left("name must be greater than 3 characters");
};
const either = curry((f, g, e) => {
  if (e.isLeft) {
    return f(e.$value);
  }

  return g(e.$value);
});
// User -> IO User -> IO String
const saveAndWelcome = compose(map(showWelcome), save);
const testF = either(IO.of, saveAndWelcome);
// <need> :: Either String User -> IO String

// validateUser(validateName) :: User -> Either String User
const register = compose(testF, validateUser(validateName));
console.log(`---register users---`);
console.log(register(user2).$value());
console.log(register(user3).$value());

const split = curry((s, delim) => s.split(delim));

// String -> [String] -> [[String]]
const toPairs = compose(map(split("=")), split("&"));

// String -> [String] -> String -> [[String]]
// const params = compose(toPairs, last, split("?"));

const readFileNew = (filename) =>
  new Task((rej, res) => {
    // map(fn) would replace res with res∘fn
    readFile(filename, (err, data) => (err ? rej(err) : res(data)));
  });

const nested = Task.of([Either.of("pillows"), left("no sleep for you")]);
console.log(map(map(map(toUpperCase)), nested));
