'use strict'

import { mainDiv } from "./variabales";

export function printHoursList(freeTermins, busyTermins) {

    freeTermins.forEach(item => {

        const element = document.createElement("div");
        element.classList.add("content_item");

        if (busyTermins.indexOf(item) == -1) {
            element.innerHTML = `
            <span class="content_item_left">${item}</span>
            <span class="content_item_center">WOLNE</span> 
            <span class="content_item_right stepThree">Wybierz</span>
            `
        }

        else {
            element.classList.add('offDay');
            element.innerHTML = `
            <span class="content_item_left">${item}</span>
            <span class="content_item_center">Zajęte</span> 
            <span class="content_item_right stepThree">Wybierz</span>
            `
        }

        mainDiv.appendChild(element);

    });

}

