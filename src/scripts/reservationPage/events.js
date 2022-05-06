'use strict'

import { stepTwo, stepThree, stepFour } from "./steps";
import { servicesArray, nextThirtyDays } from "./variabales";
import { btn } from "./variabales";

export function selectServiceEvent() {

    const stepOneBtns = Array.from(document.querySelectorAll('.stepOne'));

    for (let i = 0; i < stepOneBtns.length; i++) {
        stepOneBtns[i].addEventListener('click', (e) => {
            let index = stepOneBtns.indexOf(e.target);
            let services = servicesArray[index]['name'];
            stepTwo(services)
        })
    }
}

export function selectDayEvent(services) {
    const stepTwoBtns = Array.from(document.querySelectorAll('.stepTwo'));

    for (let i = 0; i < stepTwoBtns.length; i++) {
        stepTwoBtns[i].addEventListener('click', (e) => {
            let index = stepTwoBtns.indexOf(e.target);
            let date = nextThirtyDays[index];
            if (nextThirtyDays[index]['freeTermins'] == 0) {
                alert('W tym dniu nie ma już wolnych miejsc. Wybierz inny termin.')
            }
            else if (nextThirtyDays[index]['date'] == new Date().toLocaleDateString("pl-PL")) {
                alert('Rezerwacja w dniu dzisiejszym jest niemożliwa.')
            }
            else {
                stepThree(services, date)
            }
        })
    }
}

export function selectHoursEvents(services, date) {
    const stepThreeBtns = Array.from(document.querySelectorAll('.stepThree'));

    btn.addEventListener('click', () => {
        stepThree(services, date);
    })

    for (let i = 0; i < stepThreeBtns.length; i++) {
        stepThreeBtns[i].addEventListener('click', (e) => {
            let index = stepThreeBtns.indexOf(e.target);
            let hour = date.termins[index];
            let selectDate = date.date;

            if (date.busyTermins.indexOf(hour) != -1) {
                alert('Ten termin jest już zajęty! Wybierz inną godzinę.')
            }
            else {
                stepFour(services, selectDate, hour)
            }
        })
    }
}