import { compose, curry } from "./exercises04.mjs";

const firstWords = compose(join(" "), take(3), split(" "));
const tldr = compose(map(firstWords), readFile);
map(tldr, ["file1", "file2"]);

const sequence = curry((of, f) => f.sequence(of));

// getAttribute :: String -> Node -> Maybe String
// $ :: Selector -> IO Node
// getControlNode :: Selector -> IO(Maybe(IO Node))
// getAttribute('aria-controls') :: Node -> Maybe String
const getControlNode = compose(
  map(map($)),
  map(getAttribute("aria-controls")),
  $
);
