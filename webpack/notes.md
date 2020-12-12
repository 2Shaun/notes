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
