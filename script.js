let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetDisplay = false;


const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const { classList, textContent } = button;

        if (classList.contains('number')) {
            appendNumber(textContent);
        } else if (classList.contains('operator')) {
            setOperator(textContent);
        } else if (classList.contains('equals')) {
            calculate();
        } else if (classList.contains('clear')) {
            clear();
        } else if (classList.contains('decimal')) {
            appendDecimal();
        }
    });
});

function appendNumber(number) {
    if (display.textContent === '0' || shouldResetDisplay) {
        resetDisplay();
    }
    display.textContent += number;
}

function setOperator(operator) {
    if (currentOperator !== null) calculate();
    firstNumber = display.textContent;
    currentOperator = operator;
    shouldResetDisplay = true;
}

function calculate() {
    if (currentOperator === null || shouldResetDisplay) return;
    if (currentOperator === '/' && display.textContent === '0') {
        display.textContent = "Error";
        reset();
        return;
    }

    secondNumber = display.textContent;
    display.textContent = roundResult(operate(currentOperator, firstNumber, secondNumber));
    currentOperator = null;
}

function clear() {
    display.textContent = '0';
    firstNumber = '';
    secondNumber = '';
    currentOperator = null;
    shouldResetDisplay = false;
}

function resetDisplay() {
    display.textContent = '';
    shouldResetDisplay = false;
}

function roundResult(result) {
    return Math.round(result * 1000) / 1000;
}

function appendDecimal() {
    if (shouldResetDisplay) resetDisplay();
    if (!display.textContent.includes('.')) display.textContent += '.';
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        case '%':
            return a % b;
        default:
            return null;
    }
}
