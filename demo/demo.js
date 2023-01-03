const InputRange = require('..')

const max_age = 150
const age_input = InputRange({min: 0, max: max_age})
const actual_year = 2022
const year_input = InputRange({min: actual_year - max_age, max: actual_year})
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