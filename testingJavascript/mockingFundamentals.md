when `require(module)` is called, the code in that module is ran and is cached in `require.cache[dir]` where `dir` is the location of the module

- jest utilizes the require cache to have full control over mocking modules

- `require.resolve` uses the `require` machinery to locate the module and return the file path

```
require('../__no-framework-mocks__/utils') // prime the cache
const utilsPath = require.resolve('../utils')
const mockUtilsPath = require.resolve('../__no-framework-mocks__/utils')
require.cache[utilsPath] = require.cache[mockUtilsPath]
```

- this snippet caches the mockUtils where the utils would typically be cached
  - now, `require('../utils')` will pull from cache and use `mockUtils` instead

```
const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler')
assert.strictEqual(winner, 'Kent C. Dodds')
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ['Kent C. Dodds', 'Ken Wheeler'],
  ['Kent C. Dodds', 'Ken Wheeler']
])
```

- thumbWar is a function which does a best of three thumb war series
- getWinner is mocked to take two players and always return player 1
  - hence, there should only be two calls to get winner with both players passed in
    - getWinner is also mocked to push the called `...args` array to this calls array each call
