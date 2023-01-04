(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const InputRange = require('@v142857/input-range')

const page = document.createElement('div')
page.innerHTML = `
    <h1> Demo input </h1>
    <label> Enter your age 
        <age-input></age-input>
    </label>
    <label> Enter your birth year
        <year-input></year-input>
    </label>
`
const max_age = 150
const actual_year = 2022
page.querySelectorAll('age-input').forEach(e=>e.replaceWith(InputRange({min: 0, max: max_age})))
page.querySelectorAll('year-input').forEach(e=>e.replaceWith(InputRange({min: actual_year - max_age, max: actual_year})))
document.body.appendChild(page)
},{"@v142857/input-range":2}],2:[function(require,module,exports){
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
    input.onpointerleave = handlers.onleave
    input.onblur = handlers.onleave
    
    shadow.appendChild(input)
    shadow.adoptedStyleSheets = [sheet]

    return el
}

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
},{}]},{},[1]);
