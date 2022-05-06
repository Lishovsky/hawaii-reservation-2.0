'use strict'

import { preloader } from "./preloader";
import { clear } from "./clear";
import { setToday } from "./setToday";

const topNav = document.querySelector('.admin-menu')
const bottomNav = document.querySelector('.admin-menu:last-child');

let counter = 0;

function printHoursList(data) {
    const mainDiv = document.querySelector('#content');
    clear()
    const dayElement = document.createElement('h5');
    dayElement.innerHTML = `Wybrano: ${data.date}, ${data.day}`;
    dayElement.style.textAlign = 'center';
    mainDiv.appendChild(dayElement);
    preloader();

    const day = new URLSearchParams({
        day: data.date,
    })

    const setData = data;

    fetch(`/downloadHoursOfDay/?${day}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(res => res.json())
        .then((results) => {
            clear()
            const dayElement = document.createElement('h5');
            dayElement.innerHTML = `Wybrano: ${data.date}, ${data.day}`;
            dayElement.style.textAlign = 'center';
            mainDiv.appendChild(dayElement);

            if (data.termins.length <= 0) {
                const element = document.createElement("div");
                element.innerHTML = `<span>Wybrano niedziele. W ten dzień salon jest zamknięty.</span>`

                mainDiv.appendChild(element);
            }
            else {
                const busyTermins = [];


                results.list.forEach(termin => {
                    busyTermins.push(termin.hour)
                })

                const resultObject = [];


                data.termins.forEach(termin => {
                    const element = document.createElement("div");
                    element.classList.add("content_item-admin");
                    element.classList.add("content_item");
                    if (busyTermins.indexOf(termin) != -1) {

                        element.innerHTML = `
                            <span class="content_item_left">${results.list[busyTermins.indexOf(termin)]['names']}</span> 
                            <span class="content_item_left content_hour">${termin}</span> 
                            <span class="content_item_center">${results.list[busyTermins.indexOf(termin)]['service']}</span>
                            <span class="content_item_center">${results.list[busyTermins.indexOf(termin)]['phone']}</span>
                            <span class="content_item_right admin-btns">
                            <img class="add" style="margin-right: 20px;" src="../img/disableAdd.svg" alt="Dodaj nową">
                            <img class="count" style="margin-right: 20px;" src="../img/countVisit.svg" alt="Sprawdź wizyty">
                            <img class="message" style="margin-right: 20px;" src="../img/message.svg" alt="Wyślij przypomnienie">
                            <img class="remove" style="margin-right: 20px;" src="../img/remove.svg" alt="anuluj rezerwacje">
                            <img class="block" src="../img/disableBlock.svg" alt="Blokuj termin">
                            </span>`

                        resultObject.push({
                            name: results.list[busyTermins.indexOf(termin)]['names'],
                            termin: termin,
                            service: results.list[busyTermins.indexOf(termin)]['service'],
                            phone: results.list[busyTermins.indexOf(termin)]['phone']
                        })

                    }
                    else {

                        element.innerHTML = `
                        <span class="content_item_left">-----</span> 
                        <span class="content_item_left content_hour">${termin}</span> 
                        <span class="content_item_center">-----</span>
                        <span class="content_item_center">-----</span>
                        <span class="content_item_right admin-btns">
                        <img class="add" style="margin-right: 20px;" src="../img/add.svg" alt="Dodaj nową">
                        <img class="count" style="margin-right: 20px;" src="../img/disableCount.svg" alt="Sprawdź wizyty">
                        <img class="message" style="margin-right: 20px;" src="../img/disableMessage.svg" alt="Wyślij przypomnienie">
                        <img class="remove" style="margin-right: 20px;" src="../img/disableRemove.svg" alt="anuluj rezerwacje">
                        <img class="block" src="../img/block.svg" alt="Blokuj termin">
                        </span>`

                        resultObject.push({
                            name: '-----',
                            termin: termin,
                            service: '-----',
                            phone: '-----'
                        })

                    }
                    mainDiv.appendChild(element);
                })

                const addNewBtnArray = Array.from(document.querySelectorAll('.add'));
                const removeBtnArray = Array.from(document.querySelectorAll('.remove'))
                const countBtnArray = Array.from(document.querySelectorAll('.count'))
                const blockBtnArray = Array.from(document.querySelectorAll('.block'))
                const messageBtnArray = Array.from(document.querySelectorAll('.message'));

                data

                for (let i = 0; i < addNewBtnArray.length; i++) {
                    addNewBtnArray[i].addEventListener('click', (event) => {

                        const index = addNewBtnArray.indexOf(event.target);

                        if (resultObject[index]['name'] !== '-----') {
                            alert('Nie można dodać rezerwacji w zajętym terminie. Wybierz inny termin.')
                        }
                        else {
                            mainDiv.innerHTML = `
                            <form style="box-sizing: border-box;" class="addNewForm" method="GET">
                                <input type="text" class="termin" readonly value="${resultObject[index]['termin']}">
                                <input type="text" class="day" readonly value="${data.date}">
                                <select class="service" required>
                                    <option>Całe ciało</option>
                                    <option>Twarz, szyja, dekolt</option>
                                    <option>Same nogi</option>
                                    <option>Od pasa w górę</option>
                                </select>
                                <input type="number" class="phone" required placeholder="Wpisz numer telefonu">
                                <input type="text" class="names" required placeholder="Wpisz imię i nazwisko">
                                <input type="text" class="mail" required placeholder="Wpisz e-mail">
                                <input type="submit" value="Dodaj">
                            </form>`

                            const addNewForm = document.querySelector('.addNewForm')

                            addNewForm.addEventListener('submit', (event) => {

                                event.preventDefault()

                                const addNewParams = new URLSearchParams({
                                    name: document.querySelector('.addNewForm .names').value,
                                    termin: document.querySelector('.addNewForm .termin').value,
                                    service: document.querySelector('.addNewForm .service').value,
                                    phone: document.querySelector('.addNewForm .phone').value,
                                    mail: document.querySelector('.addNewForm .mail').value,
                                    day: data.date
                                })

                                fetch(`/addNew/?${addNewParams}`, {
                                    method: 'get',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    mode: 'cors'
                                })
                                    .then(res => res.json())
                                    .then((data) => {
                                        alert(data.message);
                                        preloader()
                                        printHoursList(setData)
                                    })
                                    .catch((error) => {
                                        alert('Coś poszło nie tak. Błąd w dodawaniu wizyty.');
                                        console.log(error);
                                    });

                            })
                        }
                    })
                }

                for (let i = 0; i < removeBtnArray.length; i++) {
                    removeBtnArray[i].addEventListener('click', (event) => {

                        const index = removeBtnArray.indexOf(event.target);

                        if (resultObject[index]['name'] == '-----') {
                            alert('Nie można usunąć terminu, który jest wolny!')
                        }
                        else {
                            const removeParam = new URLSearchParams({
                                name: resultObject[index]['name'],
                                termin: resultObject[index]['termin'],
                                service: resultObject[index]['service'],
                                phone: resultObject[index]['phone'],
                                day: data.date
                            })

                            fetch(`/remove/?${removeParam}`, {
                                method: 'get',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                mode: 'cors'
                            })
                                .then(res => res.json())
                                .then((data) => {
                                    alert(data.message);
                                    preloader()
                                    printHoursList(setData)
                                })
                                .catch((error) => {
                                    alert('Coś poszło nie tak. Błąd w usuwaniu wizyty.');
                                    console.log(error);
                                });

                        }
                    })
                }

                for (let i = 0; i < countBtnArray.length; i++) {
                    countBtnArray[i].addEventListener('click', (event) => {
                        const index = countBtnArray.indexOf(event.target);

                        if (resultObject[index]['name'] == '-----') {
                            alert('Nie można sprawdzić ilości wizyt dla niezadeklarowanego terminu.')
                        }
                        else if (resultObject[index]['name'] == 'WOLNE') {
                            alert('Nie można sprawdzić ilości wizyt dla zablokowanego terminu.')
                        }
                        else {
                            const countParam = new URLSearchParams({
                                name: resultObject[index]['name']
                            })

                            fetch(`/visitCount/?${countParam}`, {
                                method: 'get',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                mode: 'cors'
                            })
                                .then(res => res.json())
                                .then((data) => {
                                    alert(data.message);
                                })
                                .catch((error) => {
                                    alert('Coś poszło nie tak. Błąd w sprawdzaniu ilości wizyt.');
                                    console.log(error);
                                });
                        }
                    })
                }

                for (let i = 0; i < blockBtnArray.length; i++) {
                    blockBtnArray[i].addEventListener('click', (event) => {
                        const index = blockBtnArray.indexOf(event.target);

                        if (resultObject[index]['name'] != '-----') {
                            alert('Nie można zablokować zajętego terminu.')
                        }
                        else {
                            const blockParam = new URLSearchParams({
                                termin: resultObject[index]['termin'],
                                day: data.date
                            })
                            fetch(`/block/?${blockParam}`, {
                                method: 'get',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                mode: 'cors'
                            })
                                .then(res => res.json())
                                .then((data) => {
                                    alert(data.message);
                                    preloader()
                                    printHoursList(setData);
                                })
                                .catch((error) => {
                                    alert('Coś poszło nie tak. Błąd w blokowaniu wizyty.');
                                    console.log(error);
                                });

                        }
                    })
                }

                for (let i = 0; i < messageBtnArray.length; i++) {
                    messageBtnArray[i].addEventListener('click', (event) => {
                        const index = messageBtnArray.indexOf(event.target);

                        if (resultObject[index]['name'] == '-----') {
                            alert('Nie można wysłać wiadomości do niezarezerwowanego terminu.')
                        }
                        else if (resultObject[index]['name'] == 'WOLNE') {
                            alert('Nie można wysłać wiadomości do zablokowanego terminu.')
                        }
                        else {
                            const messageParam = new URLSearchParams({
                                name: resultObject[index]['name'],
                                termin: resultObject[index]['termin'],
                                service: resultObject[index]['service'],
                                phone: resultObject[index]['phone'],
                                day: data.date
                            })

                            fetch(`/sendMessage/?${messageParam}`, {
                                method: 'get',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                mode: 'cors'
                            })
                                .then(res => res.json())
                                .then((data) => {
                                    alert(data.message);
                                })
                                .catch((error) => {
                                    alert('Coś poszło nie tak. Błąd w wysyłaniu przypomnienia.');
                                    console.log(error);
                                });
                        }
                    })
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });

    topNav.innerHTML = '<span class="back-btn">Powrót</span>'
    bottomNav.innerHTML = '<span class="back-btn">Powrót</span>'

    topNav.addEventListener('click', () => {
        clear()
        downloadData(counter)
    })

    bottomNav.addEventListener('click', () => {
        clear()
        downloadData(counter)
    })

}

function hoursEventClick(data) {
    const btns = Array.from(document.querySelectorAll('.admin-days'));
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', (event) => {
            let index = btns.indexOf(event.target);
            printHoursList(data[index])
        })
    }
}

function printDays(array) {

    const mainDiv = document.querySelector('#content');

    array.forEach(item => {

        const element = document.createElement("div");
        element.classList.add("content_item");

        let freeTermins = item.freeTermins + ' wolnych terminów'

        if (item.freeTermins == 0) {
            freeTermins = 'Brak terminów'
        }

        element.innerHTML = `
            <span class="content_item_left">${item.date}, ${item.day}</span>
            <span class="content_item_center">${freeTermins}</span> 
            <span class="content_item_right admin-days">Wybierz</span>
            `

        mainDiv.appendChild(element);

    });


}

function btnsNextOrPreviousEvents() {
    topNav.innerHTML = `
    <span class="thirtyPreviouses">30 wcześniej</span>
    <span class="thirtyNext">30 później</span>`

    bottomNav.innerHTML = `            
    <span class="thirtyPreviouses">30 wcześniej</span>
    <span class="thirtyNext">30 później</span>`

    const thirtyPreviousesBtns = Array.from(document.querySelectorAll('.thirtyPreviouses'));
    const thirtyNextBtns = Array.from(document.querySelectorAll('.thirtyNext'));

    for (let i = 0; i < thirtyPreviousesBtns.length; i++) {
        thirtyPreviousesBtns[i].addEventListener('click', () => {
            counter = counter - 30;
            downloadData(counter)
        })
    }

    for (let i = 0; i < thirtyNextBtns.length; i++) {
        thirtyNextBtns[i].addEventListener('click', () => {
            counter = counter + 30;
            downloadData(counter)
        })
    }
}

function downloadData(ammount) {
    btnsNextOrPreviousEvents()
    preloader()

    const ammountParams = new URLSearchParams({
        ammount: ammount,
    })

    fetch(`/downloadData/?${ammountParams}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(res => res.json())
        .then((data) => {
            clear()
            printDays(data.nextThirtyDays);
            hoursEventClick(data.nextThirtyDays)

        })
        .catch((error) => {
            console.log(error);
        });
}

downloadData(counter)
setToday()