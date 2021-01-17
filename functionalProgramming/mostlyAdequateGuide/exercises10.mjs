import { compose, curry } from "./exercises04.mjs";
import { Task, Maybe, IO } from "./classes.mjs";

const renderString = curry((arg1, arg2) => console.log(arg1, arg2));
const add = curry((arg1, arg2) => arg1 + arg2);
const liftA2 = curry((g, f1, f2) => f1.map(g).ap(f2));

//const safeAdd = curry((x, y) => Maybe.of(add).ap(Maybe.of(x)).ap(Maybe.of(y)));
const safeAdd = curry((x, y) => liftA2(add, Maybe.of(x), Maybe.of(y)));

console.log(safeAdd(1)(2));
console.log(safeAdd(null)(2));

const localStorage = {
  player1: { id: 1, name: "Albert" },
  player2: { id: 2, name: "Theresa" },
};

const getFromCache = (x) => new IO(() => localStorage[x]);
const game = curry((p1, p2) => `${p1.name} vs. ${p2.name}`);

const startGame = liftA2(
  game,
  getFromCache("player1"),
  getFromCache("player2")
);

const either = curry((f, g, e) => {
  if (e.isLeft) {
    return f(e.$value);
  }

  return g(e.$value);
});

console.log(startGame.unsafePerformIO());
