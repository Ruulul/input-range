module.exports = InputRange

const id = 'v142857-input-range'
var count = 0
function InputRange({ min = 0, max = 100 } = { min: 0, max: 100 }, protocol) {
    const name = `${id}-${count++}`
    const notify = protocol(listen, name)
    const el = document.createElement('div')
    const shadow = el.attachShadow({ mode: 'closed' })

    const input = document.createElement('input')
    Object.assign(input, {
        type: 'number',
        min, max,
        onkeyup,
        onpointerleave: onleave,
        onblur: onleave,
    })
    if (!min) delete input.min
    if (!max) delete input.max

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
    function onkeyup(e) {
        if (is_wider_than(e.target.min, e.target.value)) return
        ensure_range(e)
    }
    function onleave(e) {
        if (is_wider_than(e.target.min, e.target.value)) return e.target.value = ''
        ensure_range(e)
    }
    function is_wider_than(any1, any2) {
        return any1.toString().length > any2.toString().length
    }
    function ensure_range(e) {
        const el = e.target
        const val = Number(el.value)
        if (val > el.max) el.value = el.max
        else if (val < el.min) el.value = el.min
        if (notify) notify({ head: [name], type: 'update', data: { value: Number(el.value) } })
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