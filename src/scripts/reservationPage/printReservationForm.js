'use strict'

import validator from 'validator';

export function printReservationForm(box, services, date, hour) {
    const element = document.createElement("div");
    element.innerHTML = `
        <form method="POST" action="addToDb">
        <input id="service" name="service" type="text" readonly value="${services}">
        <input id="date" name="date" type="text" readonly value="${date}">
        <input id="hour" name="hour" type="text" readonly value="${hour}">
        <input id="name" name="name" type="text" minlength="5" required placeholder="Imię i nazwisko" required>
        <input id="number" name="number" type="number" required placeholder="Podaj numer telefonu" required>
        <input id="mail" name="mail" type="text" class="mail" minlength="5" required placeholder="Podaj swój E-mail" required>
        <input type="submit" class="reserved" value="Rezerwuje!">
        </form>
    `
    box.appendChild(element);

    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {

        event.preventDefault()

        const eMailValue = document.querySelector('.mail').value;
        const numberValue = document.querySelector('input[type=number]').value;

        if (validator.isEmail(eMailValue)) {
            if (numberValue.length != 9) {
                alert('Numer telefonu pownien zawierać 9 cyfr. Nie używaj odstępów ani znaku myślnika.')
            }
            else {
                form.submit();
            }
        }
        else {
            alert('Podaj prawidłowy e-mail!')
        }

    })
}


