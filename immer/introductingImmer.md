# [Introducing Immer: Immutability the easy way](https://medium.com/hackernoon/introducing-immer-immutability-the-easy-way-9d73d8f71cb3)

```js
const byID = (state, action) =>
    // produce is an immer function
    // which takes in previous state
    // a draft to modify
    // and returns a new state based on the modified draft
    produce(state, draft => {
        switch (action.type) {
            case RECEIVE_PRODUCTS:
                actions.products.forEach(product => {
                    // modifies draft
                    draft[product.id] = product
                })
                break
        }
    })
```
Note that for this implementation, there is no spreading.  The reducer wrapper provides scope of `action` to modify `draft`. 