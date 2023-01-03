module.exports = InputRange

const sheet = new CSSStyleSheet
sheet.replaceSync(getTheme())

const e = document.createElement.bind(document)
function InputRange () {
    const el = e('div')
    const shadow = el.attachShadow({mode: 'closed'})
    
    const input = e('input')
    input.type = 'number'
    input.min = 0
    input.max = 150
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