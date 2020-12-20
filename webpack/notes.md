# Webpack Notes

- **module** - `.js` file
- webpack is a static **module** builder for modern js apps

## Core Concepts

### Entry point

- where webpack will begin building its dependency graph

### Output

- `path` is a npm module typically used in this section to manipulate file paths
- VSCode autoformatter is helpful for analyzing this file

- if you define a variable in script tags but use that variable before, webpack will build your JS code so it is useable out of order
- in `index.html`, you don't want to include any individual module, but instead a bundle file which is transpiled by webpack
  - `./dist/main.js` is the default optimized bundle file for modules in `./src`
    - this can be changed in `./webpack.config.js`. this can be changed with `npx webpack --config webpack.config.js`

### Loader

- allows you to import other file types into your modules, e.g., `.txt` files as strings
- these are used to import `.css` files into JS modules
- will probably need to be configured for `glTF` files

### Plugins

- these can be used for bundle optimization, asset management, and injection of environment variables

### Resolve

### Module

- modules are of the form
```
import action from './other-module.js';

var value = action();

export default value;
```

but wrapped like so by webpack
```
function(module, exports, WEBPACK_REQUIRE_METHOD) {
 'use strict';
  
  var action = WEBPACK_REQUIRE_METHOD(1);
  var value = action();

  exports.default = value;
};
```
all of these are called in an array passed to an iife (immediately invoked function expression)
```
(function(modules) {
  var installedModules = {};

  /*
  the scope of this function is passed into functions in the 
  wrapped modules array. the `id` represents which element it is
  in that array
  */
  function WEBPACK_REQUIRE_METHOD(id) {
    // if module was already imported, return its exports
    if (installedModules[id]) {
      return installedModules[id].exports;
    }

    /*
    this creates the module variable
    and caches it in the `installedModules` array
    */
     var module = installedModules[id] = {
       id: id,
       exports: {}
     };

     // call module’s function wrapper
     modules[id](module, module.exports, WEBPACK_REQUIRE_METHOD);
  }

  // kick off by calling entry module
  WEBPACK_REQUIRE_METHOD(0);
})([
  /* 0 module */
  function() {},
  /* 1 module */
  function() {},
  /* n module */
  function() {}
]);
```