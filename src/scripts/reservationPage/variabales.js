'use strict'


export const btn = document.querySelector('nav span');

const days = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'Sobota'];

export const servicesArray = [
    {
        name: 'całe ciało',
        price: '110 zł'
    },
    {
        name: 'Twarz, szyja, dekolt',
        price: '60 zł'
    },
    {
        name: 'Same nogi',
        price: '70 zł'
    },
    {
        name: 'Od pasa w górę',
        price: '70 zł'
    }
]

export let whichDay = days[0];
export let whichDate = new Date();

export const headingsAndDescriptions = [
    {
        mainHeadingText: 'WYBIERZ USŁUGĘ',
        headingDescriptionText: 'WIZYTA W SALONIE TRWA NIE DLUŻEJ NIŻ 30 MINUT'
    },
    {
        mainHeadingText: 'WYBIERZ TERMIN',
        headingDescriptionText: `DZIŚ JEST ${days[new Date().getDay()]}, ${days[new Date().getDay()].toUpperCase(), new Date().toLocaleDateString("pl-PL")}`
    },
    {
        mainHeadingText: 'WYBIERZ GODZINĘ',
        headingDescriptionText: ''
    },
    {
        mainHeadingText: 'PODAJ SWOJE DANE',
        headingDescriptionText: 'REZERWUJĄC WIZYTĘ WYRAŻASZ ZGODĘ NA PRZETWARZANIE DANYCH ZGODNIE Z RODO ORAZ NA KONTAKT Z NASZEJ STRONY!'
    }
]

export const mainDiv = document.querySelector('#content');