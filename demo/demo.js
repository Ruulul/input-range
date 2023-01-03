const InputRange = require('..')

const age_input = InputRange()
const year_input = InputRange()
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
page.querySelectorAll('age-input').forEach(e=>e.replaceWith(age_input))
page.querySelectorAll('year-input').forEach(e=>e.replaceWith(year_input))
document.body.appendChild(page)