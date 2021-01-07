export class Either {
  static of(x) {
    return new Right(x);
  }

  constructor(x) {
    this.$value = x;
  }
}

export class Right extends Either {
  map(f) {
    return Either.of(f(this.$value));
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
    this.fork = fork;
  }

  static rejected(x) {
    return new Task((reject, _) => reject(x));
  }

  static of(x) {
    return new Task((_, resolve) => resolve(x));
  }

  map(fn) {
    return new Task((reject, resolve) =>
      this.fork(reject, compose(resolve, fn))
    );
  }

  ap(f) {
    return this.chain((fn) => f.map(fn));
  }

  chain(fn) {
    return new Task((reject, resolve) =>
      this.fork(reject, (x) => fn(x).fork(reject, resolve))
    );
  }

  join() {
    return this.chain((x) => x);
  }
}
