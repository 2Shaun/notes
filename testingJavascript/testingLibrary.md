## [About Queries](https://testing-library.com/docs/queries/about/)

- queries are used to get elements on the screen(some throw errors or return promises). user events can then be used and assertions can be made using `jest-dom`. `within` can also then be used to access children. `queryBy` for example will return `null` if something is found (used for negative testing)
  - anything should be accessible via `getByRole`. If not, then your application may be inaccessible (see ARIA below). you can then filter by `name` with the options object
  - `getByText` should be used for non-interactive elements such as `div`s and `span`s
  - `getByTestId` should be used for a non-interactive element has dynamic text or if a interactive element does not have a set `role`
- queries can either be called as a method for a `container` object or the `container` object can be passed in as the first argument to the query
  - `@testing-library/react` may already populate this but the docs recommend using `document.body` via `screen` and calling queries as a method of the `screen` object
    - note that by default, jest sets the `testEnviroment` to `jsdom` which allows the `screen` object to be used. if your test environment is `node`, this wont be the case
- `setupFilesAfterEnv` in the jest config will run code before the testing framework is added to the environment
  - `@testing-library/jest-dom/extend-expect` was added to extend expect to, for example, contain `toHaveTextContent` which provides more meaningful test fail output

## [@testing-library/jest-dom](https://github.com/testing-library/jest-dom)

- reduces code reuse by providing helper functions that help check the way a dom element is behaving
  - `toBeVisible`
    - checks a few things like `display: none` or `opacity: 0` to see if an element is visible to the user

## HTML review

- ARIA
  - accessible rich internet applications
  - [roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#roles) are used to allow the accessibility tree to define 'what kind of thing it is'
- `<label>` represents a caption for a `labelable element`
  - has a `for` attribute which should be set to the `id` attribute of the `labelable element`
- `document.querySelector :: css selector -> html element`
  - this returns a valid `container` as specified above
