const resultElement = document.getElementById('result');
const clearButton = document.getElementById('clear-button');
const deleteButton = document.getElementById('delete-button');
const divideButton = document.getElementById('divide-button');
const multiplyButton = document.getElementById('multiply-button');
const subtractButton = document.getElementById('subtract-button');
const addButton = document.getElementById('add-button');
const decimalButton = document.getElementById('decimal-button');
const equalButton = document.getElementById('equal-button');
const numberBtn = document.querySelectorAll('.number');

let result = '';
let operation = '';
let previousOperand = 0;

const appendNumber = (number) =>{
    if(number === '.' && result.includes('.')){
        return;
    }
    result += number;
    updateDisplay();
}

const updateDisplay = () => {
    if(operation){
        resultElement.innerText = `${previousOperand} ${operation} ${result}`;
    }else{
    resultElement.innerText = result;
    }
}

const selectOperator = (operatorValue) =>{
    if(result === '' ) return;

    if(operation !== '' && previousOperand !== ''){
        calculateResult();
    }

    operation = operatorValue;
    previousOperand = result;
    result = '';
    updateDisplay();
}

const calculateResult = () => {
    let evaluatedResult;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(result);

    if(isNaN(prev) || isNaN(current)) return;

    switch (operation){
        case '+' :
            evaluatedResult = prev + current;
            break;

            case '-' :
                evaluatedResult = prev - current;
                break;

                case '*' : 
                evaluatedResult = prev * current;
                break;

                case '/' :
                    evaluatedResult = prev / current;
                    break;

                    default :
                       return;
    }

    result = evaluatedResult.toString();
    operation = '';
    previousOperand = '';
}

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
    });
});

const clearDisplay = () => {
    result = '';
    previousOperand = '';
    operation = '';
    updateDisplay();
}

const deleteLastDigit = () => {
    if(result === '') return;
    result = result.slice(0,-1);
    updateDisplay();
}

decimalButton.addEventListener("click", () => appendNumber('.'));
addButton.addEventListener('click', () => selectOperator('+'));
subtractButton.addEventListener('click', () => selectOperator('-'));
multiplyButton.addEventListener('click', () => selectOperator('*'));
divideButton.addEventListener('click', () => selectOperator('/'));
equalButton.addEventListener('click', () => {
    if(result === '') return;
    calculateResult();
    updateDisplay();
});

clearButton.addEventListener('click', clearDisplay);
deleteButton.addEventListener('click', deleteLastDigit);

