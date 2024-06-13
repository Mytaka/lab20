// Создание контейнера для калькулятора
const calculator = document.createElement('div');

// Создание дисплея калькулятора
const display = document.createElement('input');
display.type = 'text';
display.disabled = true;
display.style.width = '100%';
calculator.appendChild(display);

// Создание кнопок
const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
];

const buttonContainer = document.createElement('div');

buttons.forEach(text => {
    const button = document.createElement('button');
    button.innerText = text;
    button.style.width = '25%';
    button.style.height = '50px';
    button.addEventListener('click', () => onButtonClick(text));
    buttonContainer.appendChild(button);
});

calculator.appendChild(buttonContainer);
document.body.appendChild(calculator);

// Логика калькулятора
let currentInput = '';
let operator = '';
let firstOperand = null;

function onButtonClick(value) {
    if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput !== '') {
            firstOperand = parseFloat(currentInput);
            operator = value;
            currentInput = '';
        }
    } else if (value === '=') {
        if (firstOperand !== null && operator !== '' && currentInput !== '') {
            const secondOperand = parseFloat(currentInput);
            let result;
            switch (operator) {
                case '+':
                    result = firstOperand + secondOperand;
                    break;
                case '-':
                    result = firstOperand - secondOperand;
                    break;
                case '*':
                    result = firstOperand * secondOperand;
                    break;
                case '/':
                    result = firstOperand / secondOperand;
                    break;
            }
            display.value = result;
            currentInput = '';
            firstOperand = null;
            operator = '';
        }
    } else if (value === 'C') {
        currentInput = '';
        operator = '';
        firstOperand = null;
        display.value = '';
    } else {
        currentInput += value;
        display.value = currentInput;
    }
}
