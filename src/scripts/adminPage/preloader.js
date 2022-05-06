'use strict'

export function preloader() {
    const mainDiv = document.querySelector('#content');

    mainDiv.innerHTML = `
    <div class="preloader"></div>
    <p style="padding-bottom: 4vh !important;" id="preloader-text">ładowanie...</p>
`
}