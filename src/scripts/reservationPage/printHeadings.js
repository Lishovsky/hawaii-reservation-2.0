export function printHeadings(numberOfStep, stepTexts) {

    const mainHeadingText = document.querySelector('main h2 .text');
    const mainHeadingStep = document.querySelector('main h2 .step');

    const headingDescription = document.querySelector('main h3');

    mainHeadingText.innerText = stepTexts[numberOfStep]['mainHeadingText'];
    mainHeadingStep.innerText = `Krok ${numberOfStep + 1}: `;
    headingDescription.innerHTML = stepTexts[numberOfStep]['headingDescriptionText'];
}