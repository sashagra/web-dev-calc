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

const DAY_STRING = ['день', 'дня', 'дней'];

const startButton = document.querySelector('.start-button'),
    firstScreen = document.querySelector('.first-screen'),
    formCalculate = document.querySelector('.form-calculate'),
    endButton = document.querySelector('.end-button'),
    blockTotal = document.querySelector('.total'),
    totalPriceSum = document.querySelector('.total_price__sum'),
    fastRange = document.querySelector('.fast-range'),
    desktopTemplates = document.getElementById('desktopTemplates'),
    mobileTemplates = document.getElementById('mobileTemplates'),
    typeSite = document.querySelector('.type-site'),
    mainForm = document.querySelector('.main-form'),
    rangeDeadline = document.querySelector('.range-deadline'),
    deadlineValue = document.querySelector('.deadline-value'),
    maxDeadline = document.querySelector('.max-deadline');

// Функция склоняет слова от количества (3 варианта)
function declOfNum(n, titles) {
    return n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
                            0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
    }

function showElem(elem) {
    elem.style.display = 'block';
}

function hideElem(elem) {
    elem.style.display = 'none';
}

function yesNoSwitcher(elem) {
    const yesNoElement = document.querySelector(`.${elem.id}_value`)
    if ( yesNoElement !== null) {
        if (elem.checked) {
            yesNoElement.textContent = 'Да';
        } else {
            yesNoElement.textContent = 'Нет';
        }
    }
}

const renderTextContent = (total, site, minDay, maxDay) => {
    
    totalPriceSum.textContent = total;
    typeSite.textContent = site;
    maxDeadline.textContent = declOfNum(maxDay, DAY_STRING);
    rangeDeadline.min = minDay;
    rangeDeadline.max = maxDay;
    deadlineValue.textContent = declOfNum(rangeDeadline.value,  DAY_STRING)
}

function priceCalculate(elem) {
    let result = 0,
        index = 0,
        options = [],
        site = '',
        minDeadlineDay = DATA.deadlineDay[index][0],
        maxDeadlineDay = DATA.deadlineDay[index][1];

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
            site = item.dataset.site; 
            maxDeadlineDay = DATA.deadlineDay[index][1];
            minDeadlineDay = DATA.deadlineDay[index][0];
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

    renderTextContent(result, site, minDeadlineDay, maxDeadlineDay);
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
                document.querySelector('.mobileTemplates_value').textContent = 'Нет';
            }
        }
        yesNoSwitcher(target);
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