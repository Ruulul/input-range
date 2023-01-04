## Using
```js
const InputRange = require('@v142857/input-range')
const input = InputRange({
    min: 0,
    max: 100, 
}, protocol) //these are the defaults
document.body.append(input)

function protocol (notify) {
    // notify here is the function you use to notify the sub component
    return listen
}
function listen (message) {
    // here you will receive messages from the sub component
    const { type, data } = message
}
```
## Contributing
```bash
pnpm install
pnpm start 
```