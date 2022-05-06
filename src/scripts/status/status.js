const mainDiv = document.querySelector('#content');

function printContent() {

    if (reservationStatus == "sukces") {
        mainDiv.innerHTML = `
            <h2 id="stepFive">REZERWACJA UDANA!</h2>
            <h3 id="stepFiveDesc">DO ZOBACZENIA W HAWAII KATOWICE</h3>
            <a class="link" href="https://www.hawaii-katowice.pl">Powrót do strony głównej</a>
        `
    }

    else if (reservationStatus == "niepowodzenie") {
        mainDiv.innerHTML = `
        <h2 id="stepFive">NIEPOWODZENIE</h2>
        <h3 id="stepFiveDesc">Spróbuj jeszcze raz</h3>
        <a class="link" href="https://www.hawaii-katowice.pl">Powrót do strony głównej</a>
    `
    }

    else {
        location.href = "/";
    }
}

function checkStatus() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    reservationStatus = urlParams.get('status')

    printContent()
}

checkStatus()