import { compose, curry } from "./exercises04.mjs";

const firstWords = compose(join(" "), take(3), split(" "));
const tldr = compose(map(firstWords), readFile);
map(tldr, ["file1", "file2"]);

/*
sequence is traverse with identity
it gives easier access to the inner functor because
it wraps it in identity whereas traverse wraps it in
an arbitrary functor
*/

/*
the second arg is the one we are calling sequence on
so, when implementing sequence, you'll need to return
something like of(new f)
inside that traversable implementation, we have access to new
*/
const sequence = curry((of, f) => f.sequence(of));

// getAttribute :: String -> Node -> Maybe String
// $ :: Selector -> IO Node
// getControlNode :: Selector -> IO(Maybe(IO Node))
// getAttribute('aria-controls') :: Node -> Maybe String
let getControlNode = compose(
  map(map($)),
  map(getAttribute("aria-controls")),
  $
);

// traverse(IO.of, $) :: Maybe String -> IO Maybe Node
// chain(traverse(IO.of, $)) :: IO Maybe String -> IO Maybe Node
getControlNode = compose(
  chain(traverse(IO.of, $)),
  // IO Node -> IO Maybe String
  map(getAttribute("aria-controls")),
  $
);
