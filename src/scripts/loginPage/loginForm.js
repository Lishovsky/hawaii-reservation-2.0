function checkStatus() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.get('error') == "wrongData") {
        alert('Wprowadzone dane są niepoprawne. Spróbuj jeszcze raz.');
    }
}

checkStatus()