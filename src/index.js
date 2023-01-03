module.exports = InputRange

const sheet = new CSSStyleSheet
sheet.replaceSync(getTheme())

const e = document.createElement.bind(document)
function InputRange ({min = 0, max = 100} = {min: 0, max: 100}) {
    const el = e('div')
    const shadow = el.attachShadow({mode: 'closed'})
    
    const input = e('input')
    input.type = 'number'
    input.min = min
    input.max = max
    input.onkeyup = handlers.onkeyup
    
    shadow.appendChild(input)
    shadow.adoptedStyleSheets = [sheet]

    return el
}

const handlers = {
    onkeyup(e) {
        actions.ensureRange(e)
    }
}
const actions = {
    ensureRange(e) {
        const el = e.target
        const len_min = el.min.toString().length
        const len_typed = el.value.toString().length
        if (len_typed < len_min) return
        const val = new Number(el.value)
        if (val > el.max) el.value = el.max
        else if (val < el.min) el.value = el.min
    }
}

function getTheme () {
    return `
        input {
            padding: 0.5em 1em;
            border-radius: 1em;
        }
    `
}