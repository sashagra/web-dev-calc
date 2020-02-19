    'use strict';

const DATA = {
    whichSite: ['landing', 'multiPage', 'onlineStore'],
    price: [4000, 8000, 26000],
    desktopTemplates: [50, 40, 30],
    adapt: 20,
    mobileTemplates: 15,
    editable: 10,
    metrikaYandex: [500, 1000, 2000],
    analyticsGoogle: [850, 1350, 3000],
    sendOrder: 500,
    deadlineDay: [[2, 7], [3, 10], [7, 14]],
    deadlinePercent: [20, 17, 15]
};

const startButton = document.querySelector('.start-button'),
    firstScreen = document.querySelector('.first-screen'),
    formCalculate = document.querySelector('.form-calculate'),
    endButton = document.querySelector('.end-button'),
    blockTotal = document.querySelector('.total'),
    totalPriceSum = document.querySelector('.total_price__sum'),
    fastRange = document.querySelector('.fast-range'),
    desktopTemplates = document.querySelector('#desktopTemplates'),
    mobileTemplates = document.querySelector('#mobileTemplates'),
    mainForm = document.querySelector('.main-form');

function showElem(elem) {
    elem.style.display = 'block';
}

function hideElem(elem) {
    elem.style.display = 'none';
}

function priceCalculate(elem) {
    let result = 0,
        index = 0,
        options = [];

    if (elem.name === 'whichSite') {
        for (const item of formCalculate.elements) {
            if (item.type === 'checkbox') {
                item.checked = false;
                document.getElementById('mobileTemplates').disabled = true;
            }
        }
        hideElem(fastRange);
    }

    for (const item of formCalculate.elements) {
        if (item.name === 'whichSite' && item.checked) {
            index = DATA.whichSite.indexOf(item.value);        
        } else if (item.classList.contains('calc-handler') && item.checked) {
            options.push(item.value);
        }
    }

    options.forEach((key) => {
        if (typeof(DATA[key]) === 'number') {
            if (key === 'sendOrder') {
                result += DATA[key];
            } else {
                result += DATA.price[index] * DATA[key] / 100;
            }
        } else {
            if (key === 'desktopTemplates') {
                result += DATA.price[index] * DATA[key][index] / 100;
            } else {
                result += DATA[key][index];
            }
        }
    })

    result += DATA.price[index];
    totalPriceSum.textContent = result;
}

function handlerCallBackForm(event) {
    const target = event.target;
    if (target.classList.contains('want-faster')) {
        target.checked ? showElem(fastRange) : hideElem(fastRange);
    }

    if (target.classList.contains('calc-handler')) {

        if (target.value === "adapt") {
            if (target.checked) {
                mobileTemplates.disabled = false;
            } else {
                mobileTemplates.checked = false;
                mobileTemplates.disabled = true;
            }
        }

        priceCalculate(target);
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