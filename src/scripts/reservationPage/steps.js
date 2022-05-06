'use strict'

import { mainDiv, servicesArray, headingsAndDescriptions, btn } from "./variabales";
import { cleanMainDiv } from './cleanMainDiv.js';
import { printServices } from "./printServices";
import { printHeadings } from "./printHeadings";
import { downloadNextThirtyDaysBusyTermins } from "./printDaysList";
import { printHoursList } from "./printHoursList";
import { printReservationForm } from "./printReservationForm";
import { selectServiceEvent, selectHoursEvents } from "./events"

export let step = 0;

export function stepOne() {
    cleanMainDiv()
    btn.style.opacity = '0';
    setTimeout(() => {
        step = 0;
        printHeadings(step, headingsAndDescriptions);
        printServices(mainDiv, servicesArray)
        selectServiceEvent()
        btn.style.display = "none";
    }, 260);
}


export function stepTwo(services) {
    cleanMainDiv()
    setTimeout(() => {
        btn.style.display = 'block';
        btn.style.opacity = '1';
        step = 1;
        printHeadings(step, headingsAndDescriptions);
        downloadNextThirtyDaysBusyTermins(services)
        btn.addEventListener('click', () => {
            stepOne()
        })
    }, 260)
}

export function stepThree(services, date) {
    cleanMainDiv()
    setTimeout(() => {
        step = 2;
        printHoursList(date.termins, date.busyTermins);
        headingsAndDescriptions[2]['headingDescriptionText'] = `WYBRANO ${date.day.toUpperCase()}, ${date.date}`
        printHeadings(step, headingsAndDescriptions);
        selectHoursEvents(services, date)
        btn.addEventListener('click', () => {
            stepTwo(services)
        })
    }, 260)
}

export function stepFour(services, date, hour) {
    cleanMainDiv()
    setTimeout(() => {
        step = 3;
        printHeadings(step, headingsAndDescriptions);
        printReservationForm(mainDiv, services, date, hour)
    }, 260)
}

stepOne()