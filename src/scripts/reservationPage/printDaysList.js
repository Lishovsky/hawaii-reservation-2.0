'use strict'

import { nextThirtyDays, mainDiv } from "./variabales";
import { selectDayEvent } from "./events";
import { step } from "./steps";


export function downloadNextThirtyDaysBusyTermins(services) {
    mainDiv.innerHTML = `
        <div class="preloader"></div>
        <p id="preloader-text">ładowanie...</p>
    `
    fetch('/nextThirtyDaysBusyTermins', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            mainDiv.innerHTML = '';
            let result = '';
            result = data;
            nextThirtyDays = result.nextThirtyDays;
            if (step == 1) {
                printDaysList(nextThirtyDays)
                selectDayEvent(services)
            }
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
}


function printDaysList(array) {

    array.forEach(item => {

        const element = document.createElement("div");
        element.classList.add("content_item");

        if (item == array[0]) {
            element.classList.add('offDay');
        }

        let freeTermins = item.freeTermins + ' wolnych terminów'

        if (item.freeTermins == 0) {
            freeTermins = 'Brak terminów'
            element.classList.add('offDay');
        }

        element.innerHTML = `
        <span class="content_item_left">${item.date}, ${item.day}</span>
        <span class="content_item_center">${freeTermins}</span> 
        <span class="content_item_right stepTwo">Wybierz</span>
        `

        mainDiv.appendChild(element);

    });

}

