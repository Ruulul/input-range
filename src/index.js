module.exports = InputRange

const id = 'v142857-input-range'
var count = 0
function InputRange({min, max} = {}, protocol) {
    const name = `${id}-${count++}`
    const notify = protocol(listen, name)
    const el = document.createElement('div')
    const shadow = el.attachShadow({ mode: 'closed' })

    const input = document.createElement('input')
    Object.assign(input, {
        type: 'number',
        min, max,
        oninput: respond,
        onkeyup,
        onblur: onleave,
    })
    if (!min) input.removeAttribute('min')
    if (!max) input.removeAttribute('max')

    const style = document.createElement('style')
    style.textContent = get_theme()

    shadow.append(style, input)

    return el

    function listen(message) {
        const { type, data: { value, min, max } = {} } = message
        if (type === 'update') {
            if (value) input.value = value
            if (min) input.min = min
            if (max) input.max = max
        }
    }
    function respond() {
        notify({ head: [name], type: 'update', data: { value: Number(input.value) } })
    }
    function onkeyup({ target: el }) {
        if (el.min && !is_wider_than(el.min, el.value))
            ensure_range(el)
        respond()
    }
    function onleave({ target: el }) {
        if (el.min && !is_wider_than(el.min, el.value)) 
            ensure_range(el)
        respond()
    }
    function is_wider_than(any1, any2) {
        return any1.toString().length > any2.toString().length
    }
    function ensure_range(el) {
        const val = Number(el.value)
        if (val > el.max) el.value = el.max
        else if (val < el.min) el.value = el.min
    }
}

function get_theme() {
    return `
        input {
            padding: 0.5em 1em;
            border-radius: 1em;
        }
    `
}