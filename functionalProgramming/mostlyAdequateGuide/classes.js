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
