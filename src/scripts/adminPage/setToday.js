'use strict'

export function setToday() {
    const days = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'Sobota'];
    const date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    const dateElement = document.querySelector('.dateDay');
    dateElement.innerHTML = `Dziś jest ${days[date.getDay()]}, ${date.toLocaleDateString("pl-PL")}`
}