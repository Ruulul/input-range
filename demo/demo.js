const InputRange = require('..')

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