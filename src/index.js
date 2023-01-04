module.exports = InputRange

const e = document.createElement.bind(document)
function InputRange({ min = 0, max = 100 } = { min: 0, max: 100 }, protocol) {
    const notify = protocol ? protocol(listen) : undefined
    const handlers = {
        onkeyup(e) {
            if (utils.isWiderThan(e.target.min, e.target.value)) return
            actions.ensureRange(e)
        },
        onleave(e) {
            if (utils.isWiderThan(e.target.min, e.target.value)) return e.target.value = ''
            actions.ensureRange(e)
        }
    }
    const utils = {
        isWiderThan(any1, any2) {
            return any1.toString().length > any2.toString().length
        }
    }
    const actions = {
        ensureRange(e) {
            const el = e.target
            const val = new Number(el.value)
            if (val > el.max) el.value = el.max
            else if (val < el.min) el.value = el.min
            if (notify) notify({ type: 'update', data: { value : Number(el.value) } })
        }
    }

    const el = e('div')
    const shadow = el.attachShadow({ mode: 'closed' })

    const input = e('input')
    input.type = 'number'
    input.min = min
    input.max = max
    input.onkeyup = handlers.onkeyup
    input.onpointerleave = handlers.onleave
    input.onblur = handlers.onleave

    const style = e('style')
    style.textContent = getTheme()

    shadow.append(style, input)

    return el

    function listen (message) {
        const { type, data: {value, min, max} = {} } = message
        if (type === 'update') {
            if (value) input.value = value
            if (min) input.min = min
            if (max) input.max = max
        }
    }
}

function getTheme() {
    return `
        input {
            padding: 0.5em 1em;
            border-radius: 1em;
        }
    `
}