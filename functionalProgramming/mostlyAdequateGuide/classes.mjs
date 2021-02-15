import { compose } from "./exercises04.mjs";

/*
map of a particular class always returns that class
*/

export class Either {
  static of(x) {
    return new Right(x);
  }

  constructor(x) {
    this.$value = x;
  }
}

export class Right extends Either {
  get isLeft() {
    return false;
  }

  get isRight() {
    return true;
  }

  static of(x) {
    throw new Error(
      "`of` called on class Right (value) instead of Either (type)"
    );
  }

  map(fn) {
    return Either.of(fn(this.$value));
  }

  ap(f) {
    return f.map(this.$value);
  }

  chain(fn) {
    return fn(this.$value);
  }

  join() {
    return this.$value;
  }

  sequence(of) {
    return this.traverse(of, identity);
  }

  traverse(of, fn) {
    fn(this.$value).map(Either.of);
  }

  inspect() {
    return `Right(${inspect(this.$value)})`;
  }
}

export class Left extends Either {
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

export class Task {
  constructor(fork) {
    /*
    reject :: a -> b
    resolve :: c -> d
    fork :: reject -> resolve -> e
    fork does not have to return with resolve or reject
    it cou
    */
    this.fork = fork;
  }

  static rejected(x) {
    return new Task((reject, _) => reject(x));
  }

  static of(x) {
    return new Task((_, resolve) => resolve(x));
  }

  /* 
  map :: (p -> c) -> Task(reject, p -> d)
  if c is a Task, p -> c should be passed to chain 
  */
  map(fn) {
    return new Task((reject, resolve) =>
      this.fork(reject, compose(resolve, fn))
    );
  }

  ap(f) {
    return this.chain((fn) => f.map(fn));
  }

  // chain :: (q -> Task) -> Task
  chain(fn) {
    return new Task((reject, resolve) =>
      this.fork(reject, (x) => fn(x).fork(reject, resolve))
    );
  }

  join() {
    return this.chain((x) => x);
  }
}

export class Maybe {
  get isNothing() {
    return this.$value === null || this.$value === undefined;
  }

  get isJust() {
    return !this.isNothing;
  }

  constructor(x) {
    this.$value = x;
  }

  static of(x) {
    return new Maybe(x);
  }

  map(fn) {
    return this.isNothing ? this : Maybe.of(fn(this.$value));
  }

  ap(f) {
    return this.isNothing ? this : f.map(this.$value);
  }

  chain(fn) {
    return this.map(fn).join();
  }

  join() {
    return this.isNothing ? this : this.$value;
  }

  sequence(of) {
    return this.traverse(of, identity);
  }

  traverse(of, fn) {
    return this.isNothing ? of(this) : fn(this.$value).map(Maybe.of);
  }
}

export class IO {
  constructor(fn) {
    this.unsafePerformIO = fn;
  }

  // ----- Pointed IO
  static of(x) {
    return new IO(() => x);
  }

  // ----- Functor IO
  map(fn) {
    return new IO(compose(fn, this.unsafePerformIO));
  }

  // ----- Applicative IO
  // f : IO
  ap(f) {
    return this.chain((fn) => f.map(fn));
  }

  // fn :: a -> IO
  // this.map(fn) :: IO -> IO x IO
  // chain(fn) :: fn -> IO
  chain(fn) {
    return this.map(fn).join();
  }

  // IO x IO -> IO
  join() {
    return new IO(() => this.unsafePerformIO().unsafePerformIO());
  }
}

export class Container {
  constructor(x) {
    this.$value = x;
  }

  static of(x) {
    return new Container(x);
  }

  map(fn) {
    return Container.of(fn(this.$value));
  }

  /*
  F(f).ap(F(x)) = F(f)[F(x)]
  */
  ap(otherContainer) {
    return otherContainer.map(this.$value);
  }
}

class Map {
  constructor(x) {
    this.$value = x;
  }

  insert(k, v) {
    const singleton = {};
    singleton[k] = v;
    // use of this.$value here implies that Map is meant to hold JSONs
    return Map.of(Object.assign({}, this.$value, singleton));
  }

  reduceWithKeys(fn, zero) {
    return Object.keys(this.$value).reduce(
      (acc, k) => fn(acc, this.$value[k], k),
      zero
    );
  }

  map(fn) {
    return this.reduceWithKeys((m, v, k) => m.insert(k, fn(v)), new Map({}));
  }

  sequence(of) {
    return this.traverse(of, identity);
  }

  traverse(of, fn) {
    return this.reduceWithKeys(
      (f, a, k) =>
        fn(a)
          .map((b) => (m) => m.insert(k, b))
          .ap(f),
      of(new Map({}))
    );
  }
}

class List {
  constructor(xs) {
    this.$value = xs;
  }

  concat(x) {
    return new List(this.$value.concat(x));
  }

  static of(x) {
    return new List([x]);
  }

  map(fn) {
    return new List(this.$value.map(fn));
  }

  sequence(of) {
    return this.traverse(of, identity);
  }

  traverse(of, fn) {
    /*
    e.g. 
    fromPredicate :: (a -> Bool) -> a -> Either e a
    partition :: (a -> Bool) -> [a] -> [Either e a]

    f => map(fromPredicate(f))
    :: (a -> Bool) -> [a] -> Either e [a]
    f => traverse(Either.of, fromPredicate(f))

    this.$value represents the List that we are reducing over ([a])
    a represents an element of this.$value
    we apply a to the passed in fn
    we start the accumulator (f) with an empty list, of(new List([]))

    */
    return this.$value.reduce(
      (f, a) =>
        // fn(a) :: Either e a
        fn(a)
          .map((b) => (bs) => bs.concat(b))
          .ap(f),
      // Either.of(new List([]))
      of(new List([]))
    );
  }
}
/*
of(new List([])) is f_0
fn(a).map(b => bs => bs.concat(b)) : fn(bs => bs.concat(b))
bs is populated by ap with f_n : List
*/
