'use strict'

export function printServices(box, service) {
    for (let i = 0; i < service.length; i++) {
        const element = document.createElement("div");

        element.innerHTML = `
        <span class="content_item_left"> ${service[i]['name']} </span> 
        <span class="content_item_center">${service[i]['price']}</span> 
        <span class="content_item_right stepOne">Wybierz</span>`

        element.classList.add("content_item");
        box.appendChild(element)
    }
}