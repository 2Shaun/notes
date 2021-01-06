const isLastInStock = compose(prop("in_stock"), last);
const averageDollarValue = compose(average, map(prop("dollar_value")));
// [Car] -> [Car]
// this is not composition, as much as it looks like it
// sortBy is (Car -> S) x [Car] -> [Car]
//      where S is a sortable type
// prop is Car -> A
//      where A is a type which is composed to make a Car
const sortByHorsePower = sortBy(prop("horsepower"));
// [Car] -> Car
const highestHorsePower = compose(last, sortByHorsePower);
// Car -> String
const getName = prop("name");
// String -> String
const stateAsFastest = append(" is the fastest");
const fastestCar = compose(stateAsFastest, getName, highestHorsePower);
