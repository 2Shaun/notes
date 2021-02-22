- when running `npm t`, `process.env.NODE_ENV` is set to `"test"` by jest
- `import` is ES6 where ES stands for ECMAScript
- since jest runs in node, it does not allow for `import` statements
  - babel allows for converting of `import` statements to `require` statements
  - webpack has support for `import` statements
    - webpack is generally considered a front end tool and it uses babel under the hood
      - webpack is generally only used for front end because front end requires many different kinds of assets such as css, images, 3d models, fonts, etc.
        - an exception for this is server side rendering
      - front end does not actually use modules like node back ends, it's webpacks job to turn the syntactic sugar of modules into one bundle. users download these modules when they load the webpage

# .babelrc.js

- jest picks up the `.babelrc.js` file automatically
-

```
module.exports = {
  presets: [
    ['@babel/preset-env', {modules: false}],
```

- this allows babel to compile files to the appropriate language supported by the browser

  - with `{modules: false}`, webpack will handle modules (treeshaking)
    - we can have babel handle modules when jest runs by checking if `process.env.NODE_ENV === 'test'` here: `{modules: isTest ? 'cjs' : false}`
    - with `modules: 'cjs'` set, css `import`s will try to be `require`d as if they are node modules. these css files can then be mocked as empty objects and we can map css imports using `moduleNameMapper`

- treeshaking
  - done by webpack to only import exported functions as needed and not the entire module

# webpack.config.js

- `resolve.modules`
  - this array allows you to import from files as if they were in `node_modules`
  - for jest to have the same behavior, this array should be copied into the `moduleDirectories` setting in `jest.config.js`

# jest.config.js

```
module.exports = {
  ...require('./test/jest-common'), // see below
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/__tests__/**',
    '!**/__server_tests__/**',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      statements: 15,
      branches: 10,
      functions: 15,
      lines: 15,
    },
    './src/shared/utils.js': {
      statements: 100,
      branches: 80,
      functions: 100,
      lines: 100,
    },
  },
  projects: [
    './test/jest.lint.js',
    './test/jest.client.js',
    './test/jest.server.js',
    './server',
  ],
}

```

# jest-common.js

```
const path = require('path')

module.exports = {
  rootDir: path.join(__dirname, '..'),
  moduleDirectories: [      // this allows jest to import modules just as names and not as paths
    'node_modules',
    path.join(__dirname, '../src'),
    'shared',
    __dirname,
  ],
  testPathIgnorePatterns: ['<rootDir>/server/'],
  moduleNameMapper: {
    // module must come first
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./style-mock.js'),
    // can also map files that are loaded by webpack with the file-loader
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    'jest-watch-select-projects',
  ],
}

```

- recall `__dirname` is an env variable defined by node to mean the current directory

- you may have helpers defined in `moduleDirectories` that are not needed for webpack to also resolve (say you have eslint setup to resolve what's configured for webpack only), you may need `eslint-import-resolver-jest` as a dev dependency

```
// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
```

- a cool way to override a method provided by a library if you want to make sure that rendering all components are wrapped in something like `Provider` by `react-redux`

  - despite react docs recommendation to use `react-test-renderer` for snapshots, this overrided render from rtl will allow you to expect against the return value `toMatchSnapshot`

- in order to debug tests, you can set a breakpoint, click the debug button at the bottom of VS code, and then click 'Run script test'

# [jsconfig.json](https://code.visualstudio.com/docs/languages/jsconfig)

- this file adds configuration to VS code to allow you to press F12 in VS code to go to definitions for custom import resolvers

# questions

- if `react-scripts start` uses node to open the app on port 3000, why are import statements allowed here but not in `jest`?
