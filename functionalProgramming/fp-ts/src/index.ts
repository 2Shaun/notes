// typeclass Eq
interface Eq<A> {
  readonly equals: (x: A, y: A) => boolean;
}

// instance of Eq for number
const eqNumber: Eq<number> = {
  equals: (x, y) => x === y,
};
// number is now a member of the typeclass Eq

function elem<A>(E: Eq<A>): (a: A, as: Array<A>) => boolean {
  return (a, as) => as.some((item) => E.equals(item, a));
}

/*
this syntax seems incorrect
how is seed of type State<E,B>?
const map: <A, B>(f: (a: A) => B) => <E>(fa: State<E, A>) => State<E, B> = (
  f
) => (generate) => (seed) => {
  return undefined;
};
*/

// eqNumber : Eq<A> (where A=number)
console.log(elem<number>(eqNumber)(1, [2, 3, 4, 1]));
console.log(elem<number>(eqNumber)(1, [2, 3, 4]));

type Point = {
  x: number;
  y: number;
};

const eqPoint: Eq<Point> = {
  equals: (p1, p2) => p1.x === p2.x && p1.y === p2.y,
};

console.log(
  elem<Point>(eqPoint)({ x: 2, y: 1 }, [
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 0, y: 3 },
    { x: 3, y: 0 },
  ])
);
