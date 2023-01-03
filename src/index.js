module.exports = InputRange

const sheet = new CSSStyleSheet
sheet.replaceSync(getTheme())

const e = document.createElement.bind(document)
function InputRange () {
    const el = e('div')
    const shadow = el.attachShadow({mode: 'closed'})
    const input = e('input')
    shadow.appendChild(input)
    shadow.adoptedStyleSheets = [sheet]

    return el
}

function getTheme () {
    return `
        input {
            padding: 0.5em 1em;
            border-radius: 1em;
        }
    `
}