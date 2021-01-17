import { Maybe } from "./classes.mjs";
// eitherToMaybe :: Either b a -> Maybe a
const nothing = Maybe.of(null);
const either = curry((f, g, e) => {
  if (e.isLeft) {
    return f(e.$value);
  }

  return g(e.$value);
});
const always = curry((a, b) => a);
const eitherToMaybe = (e) => (e.isRight ? Maybe.of(e.$value) : Maybe.of(null));
const eitherToMaybeSolution = either(always(nothing), Maybe.of);
const eitherToTask = either(Task.rejected, Task.of);

// findUserById :: Number -> Task Error (Either Error User)
// const findNameById = compose(map(map(prop("name"))), findUserById);

const findNameById = compose(
  map(prop("name")),
  // map(chain) wasn't appropriate here
  // chain already takes care of mapping that function
  chain(eitherToTask),
  findUserById
);

const split = curry((sep, str) => str.split(sep));
const intercalate = curry((str, xs) => xs.join(str));
const strToList = split("");
const listToStr = intercalate("");
