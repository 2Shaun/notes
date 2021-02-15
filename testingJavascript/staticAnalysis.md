- prettier
  - should be a dev dependency
  - this provides a cli to format your code and save your code
  - VS code extension adds the auto formatter option on save
- eslint

  - should be a dev dependency
  - VS code extension will have red underlines in the code
  - with create-react-app, eslint will still provide output in the terminal and browser (without the VS code extension)
  - if you want to disable eslint red underlines for things that prettier is going to correct anyway, you can use `"extends": ["eslint-config-prettier"]` in the `.eslintrc`
    - VS code also does underlining without the extension with the setting "Validate"
  - eslint needs to be configured to work with typescript using `@typescript-eslint`
    - you can override eslint config for certain file extensions with:
      `"overrides": [ { "files": "**/*.+(ts|tsx)", "parser": "@typescript-eslint/parser", "parserOptions": { "project": "./tsconfig.json" } } ]`
  - `"browser": true` allows for browser globals to be considered defined, such as `window`

- after you create a new npm script, you can add `-- ` to a new script to forward all additional arguments to that script

  - `npm run prettier -- --write` would forward the `--write` argument to the `prettier` script

- babel
  - `babel` is used for transpiling and `tsc` is used for type-checking
- husky
  - should be a dev dependency
  - there's a pre-commit hook (script) defined in husky which can validate your code before making a commit
    - in Dodd's pre-commit hook, he runs tsc to check types, eslint to lint, and `prettier --list-different` to check formatting
    - after running `npm install husky --save-dev`, hooks need to be enabled with `husky install`. for someone downloading your package and running `npm i`, add `"postInstall": "npx husky install"` 
- lintstaged
  - `prettier --list-different` will only list the formatting errors that occur, so, if husky runs for a dev who doesn't have prettier configured in their editor to autoformat, it will be very annoying for them to have errors when they try to commit
  - it seems like the only reason to use this is to configure certain commands based on file extension
  - when using glob patterns, `**/*.js`, matches any deeply nested js file in your
