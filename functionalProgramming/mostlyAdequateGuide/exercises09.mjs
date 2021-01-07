import { resolve } from "path";
import { Task } from "./classes.mjs";

const delay = (ms) =>
  new Task((_, resolve) => {
    setTimeout(resolve, ms);
  });

const nestedDelay = (ms) =>
  new Task((_, resolve) => {
    new Task((_, resolve) => {
      setTimeout(resolve, ms);
    });
  });

let delay100Ms = delay(100);
let nestedDelay100Ms = nestedDelay(100);

delay100Ms.fork(
  () => {},
  () => {
    console.log("hi");
  }
);

nestedDelay100Ms.fork(
  () => {},
  () => {
    console.log("hi");
  }
);
