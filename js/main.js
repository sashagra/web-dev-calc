const startButton = document.getElementsByClassName('start-button')[0],
    firstScreen = document.getElementsByClassName('first-screen')[0],
    formCalculate = document.getElementsByClassName('form-calculate')[0],
    endButton = document.getElementsByClassName('end-button')[0],
    blockTotal = document.getElementsByClassName('total')[0],
    fastRange = document.getElementsByClassName('fast-range')[0],
    mainForm = document.getElementsByClassName('main-form')[0];



function showElem(elem) {
    elem.style.display = 'block';
}

function hideElem(elem) {
    elem.style.display = 'none';
}

function handlerCallBackForm(event) {
    const target = event.target;
    if (target.classList.contains('want-faster')) {
        target.checked ? showElem(fastRange) : hideElem(fastRange);
    }
}

startButton.addEventListener('click', () => {
    hideElem(firstScreen);
    showElem(mainForm);
});

endButton.addEventListener('click', () => {
    for (const elem of formCalculate.elements) {
        if (elem.tagName === 'FIELDSET') {
            hideElem(elem);
        }
    }
    showElem(blockTotal);
});

formCalculate.addEventListener('change', handlerCallBackForm);