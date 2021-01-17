import { resolve } from "path";
import { compose, curry } from "./exercises04.mjs";
import { Task, Maybe, IO } from "./classes.mjs";

const prop = curry((key, obj) => obj[key]);
const safeProp = curry((p, obj) => {
  console.log(obj);
  return compose(Maybe.of, prop(p))(obj);
});
const chain = curry((f, m) => m.chain(f));
const map = curry((f, m) => m.map(f));

const tag = curry((str, x) => console.log(str, x));

/*
setTimeout is n-ary
the first argument is the callback
  if this is the only argument provided,
    it will call it with the callback's arguments
    as undefined
the second argument is the delay
the rest of the arguments are the arguments provided
  to the callback
*/
const delay = (ms) => {
  tag("ms ", ms);
  return new Task((_, resolve) => {
    setTimeout(resolve, ms);
  });
};

// here, fork returns a task instead of
const nestedDelay = (ms) =>
  new Task(
    (_, resolve) =>
      new Task((_, res = resolve) => {
        setTimeout(res, ms);
      })
  );
tag("monad*monad ")(
  delay(1000)
    // this returns Task((_, res) =>
    //                setTimeout(res ∘ delay, 1000)
    .map(delay)
    .fork(null, () => {
      console.log("testing ...");
    })
);
tag("monad ")(
  delay(1000)
    /*
  this returns Task((_, res) =>
                  setTimeout(x => 
                                delay(x).fork(rej,res), 1000))
    */
    .chain(delay)
    .fork(null, () => {
      console.log("testing ...");
    })
);
let delay100Ms = delay(100);
let nestedDelay100Ms = nestedDelay(100);

delay100Ms.fork(
  () => {},
  () => {
    console.log("hi");
  }
);

nestedDelay100Ms
  .fork(
    () => {},
    () => {
      console.log("hi");
    }
  )
  .fork(() => {});

// getStreetName :: User -> Maybe String
const user = {
  id: 1,
  address: {
    street: {
      number: 22,
      name: "Walnut st",
    },
  },
};
const getStreetName = compose(chain(safeProp("street")), safeProp("address"));
console.log(getStreetName(user));

const split = curry((sep, str) => str.split(sep));
const last = (xs) => xs[xs.length - 1];

// getFile :: IO String
const getFile = IO.of("/home/mostly-adequate/ch09.md");

// pureLog :: String -> IO ()
const pureLog = (str) => new IO(() => console.log(str));

const getFileName = compose(last, split("/"));

const logFilename = compose(chain(pureLog), map(getFileName));

logFilename(getFile).unsafePerformIO();

// validateEmail :: Email -> Either String Email
// addToMailingList :: Email -> IO([Email])
// emailBlast :: [Email] -> IO()
// joinMailingList :: Email -> Either String (IO ())
const joinMailingList = compose(
  map(chain(emailBlast)),
  map(addToMailingList),
  validateEmail
);

/*
gitbook solution:
map(compose(chain(emailBlast), addToMailingList)),
mine:
compose(map(chain(emailBlast)), map(addToMailingList))
mine works because map(compose(f,g)) = compose(map(f), map(g))
*/
