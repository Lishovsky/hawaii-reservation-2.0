import { mainDiv } from "./variabales";

export function cleanMainDiv() {
    mainDiv.style.opacity = '0';
    setTimeout(() => {
        mainDiv.innerHTML = ''
        mainDiv.style.opacity = '1';
    }, 260)
}
