let num1 = "";
let num2 = "";
let operator = "";
let startNum1 = false; // indicates starting new equation
let startNum2 = false; // indicates starting to get other number for equation
let eqnReady = false; // indicates when num1 & operator are set and it's possible to get num2 from display (for evaluating using +-/* rather than =)

const input = document.querySelector(".buttons");

input.addEventListener("click", (event) => {
    const target = event.target;
    const display = document.querySelector(".display");

    if (target.classList.contains("number") && !target.classList.contains("decimal")) {
        // reset display to show appropriate num user is curr inputting
        if (startNum2) {
            display.textContent = '';
            startNum2 = false;
            eqnReady = true; // there is a # on display that can be used for num2
        }
        if (startNum1) {
            display.textContent = '';
            startNum1 = false;
        }
        display.textContent += target.textContent;
    } 
    else if (target.classList.contains("clear")) {
        display.textContent = '';
        num1 = "";
        num2 = "";
        operator = "";
        startNum1 = false;
        startNum2 = false;
        eqnReady = false;
        clearActiveOperation();
    } 
    else if (target.classList.contains("backspace")) {
         if (startNum2) { // if trying to delete after num1 has been set by an operation, but before user has began entering num2 -> assume user is trying to delete from num1 on display still, so delete from display and make user set operation/num1 again 
            display.textContent = display.textContent.slice(0, -1);
            operator = "";
            clearActiveOperation();
            startNum2 = false;
        }
        else {
            display.textContent = display.textContent.slice(0, -1);
        }
    } 
    else if (target.classList.contains("add")) {
        if (eqnReady) { // eval curr ready eqn and set this operator as active operator for next eqn
            if (display.textContent === '' || display.textContent === '-' || display.textContent === '-.' || display.textContent === '.') {
                return; // prevents users trying to eval a non-int eqn by misusing backspace
            }
            else {
                num2 = display.textContent;
                clearActiveOperation(); // disables any other curr active operation allowing users to switch btwn operations seamlessly
                target.classList.add('active');
                display.textContent = operate(num1, num2, operator);
                num1 = operate(num1, num2, operator);
                operator = target.textContent;
                num2 = "";
                startNum2 = true;
                eqnReady = false;
            }
        }
        else if (target.classList.contains("active")) { // allows disabling operation by selecting it again
            operator = "";
            clearActiveOperation();
            if (startNum2) {
                startNum2 = false;
            }
        }
        else if (display.textContent === '' || display.textContent === '-' || display.textContent === '-.' || display.textContent === '.') {
            return; // prevents users trying to eval a non # by misusing backspace
        }
        else { // set appropriate vals for num1 and operator to be used for eval by operation or = later
            num1 = display.textContent;
            operator = target.textContent;
            startNum2 = true;
            clearActiveOperation(); // disables any other curr active operation allowing users to switch btwn operations seamlessly
            target.classList.add('active');
        }
    } 
    else if (target.classList.contains("multiply")) {
        if (eqnReady) {
            if (display.textContent === '' || display.textContent === '-' || display.textContent === '-.' || display.textContent === '.') {
                return;
            }
            else {
                num2 = display.textContent;
                clearActiveOperation();
                target.classList.add('active');
                display.textContent = operate(num1, num2, operator);
                num1 = operate(num1, num2, operator);
                operator = '*'; // same code as add and divide class (and subtract too for the most part), but this line is changed b/c target.textContent !== appropriate operator in multiply and divide classes
                num2 = "";
                startNum2 = true;
                eqnReady = false;
            }
        }
        else if (target.classList.contains("active")) {
            operator = "";
            clearActiveOperation();
            if (startNum2) {
                startNum2 = false;
            }
        }
        else if (display.textContent === '' || display.textContent === '-' || display.textContent === '-.' || display.textContent === '.') {
            return;
        } 
        else {
            num1 = display.textContent;
            operator = '*';
            startNum2 = true;
            clearActiveOperation();
            target.classList.add('active');
        }
    } 
    else if (target.classList.contains("divide")) {
        if (eqnReady) {
            if (display.textContent === '' || display.textContent === '-' || display.textContent === '-.' || display.textContent === '.') {
                return;
            }
            else {
                num2 = display.textContent;
                clearActiveOperation();
                target.classList.add('active');
                display.textContent = operate(num1, num2, operator);
                num1 = operate(num1, num2, operator);
                operator = '/';
                num2 = "";
                startNum2 = true;
                eqnReady = false;
            }
        }
        else if (target.classList.contains("active")) {
            operator = "";
            clearActiveOperation();
            if (startNum2) {
                startNum2 = false;
            }
        }
        else if (display.textContent === '' || display.textContent === '-' || display.textContent === '-.' || display.textContent === '.') {
            return;
        }
        else {
            num1 = display.textContent;
            operator = '/';
            startNum2 = true;
            clearActiveOperation();
            target.classList.add('active');
        }
    } 
    else if (target.classList.contains("percentage")) {
        if (display.textContent === '' || display.textContent === '-' || display.textContent === '-.' || display.textContent === '.') {
            return;
        }
        display.textContent = display.textContent / 100.0;
    } 
    else if (target.classList.contains("subtract")) {
        if (eqnReady) {
            if (display.textContent === '' || display.textContent === '-' || display.textContent === '-.' || display.textContent === '.') {
                return;
            }
            else {
                num2 = display.textContent;
                clearActiveOperation();
                target.classList.add('active');
                display.textContent = operate(num1, num2, operator);
                num1 = operate(num1, num2, operator);
                operator = target.textContent;
                num2 = "";
                startNum2 = true;
                eqnReady = false;
            }
        }
        else if (target.classList.contains("active")) {
            operator = "";
            clearActiveOperation();
            if (startNum2) {
                startNum2 = false;
            }
        }
        else if (display.textContent === '') { // allows users to input neg sign at the start of inputting num1
            // in case neg sign is start of new num
            if (startNum2) {
                display.textContent = '';
                startNum2 = false;
                eqnReady = true;
            }
            if (startNum1) {
                display.textContent = '';
                startNum1 = false;
            }
            display.textContent += '-';
        }
        else if (!(display.textContent === '-'|| display.textContent === '-.' || display.textContent === '.')){
            num1 = display.textContent;
            operator = target.textContent;
            startNum2 = true;
            clearActiveOperation();
            target.classList.add('active');
        }
    } 
    else if (target.classList.contains("decimal")) {
        // in case decimal is start of new num
        if (startNum2) {
            display.textContent = '';
            startNum2 = false;
            eqnReady = true;
        }
        if (startNum1) {
            display.textContent = '';
            startNum1 = false;
        }
        if (display.textContent.includes('.')) { // delete curr decimal in num and add it to the end
            display.textContent = display.textContent.replace('.', '');
        }
        display.textContent += ".";
    }
    else if (target.classList.contains("equals")) {
        if (!num1 || !operator || display.textContent === '' || startNum2) {
            return; // prevents user from trying to eval incomplete eqn
        }
        else { // eval eqn, display ans, and use ans as num1 for next eqn
            num2 = display.textContent;
            clearActiveOperation();
            display.textContent = operate(num1, num2, operator);
            num1 = operate(num1, num2, operator);
            operator = "";
            num2 = "";
            startNum1 = true; // if # is pressed, assume user is trying to start new eqn w/ new num1 instead of using ans for num1 in next eqn
            startNum2 = false;
            eqnReady = false;
        }
    }
    display.scrollLeft = display.scrollWidth; // make sure rightmost digit as always visible
});

// add effect for all buttons when pressed except for the operations that are able to be active
input.addEventListener("mousedown", (event) => {
    const target = event.target;
    if (!(target.classList.contains("add") || target.classList.contains("subtract") || target.classList.contains("multiply") || target.classList.contains("divide"))) {
        target.style.filter = "brightness(80%)";
    }
})

input.addEventListener("mouseup", (event) => {
    const target = event.target;
    if (!(target.classList.contains("add") || target.classList.contains("subtract") || target.classList.contains("multiply") || target.classList.contains("divide"))) {
        target.style.filter = "";
    }
})

function clearActiveOperation() {
    const activeOperation = document.querySelector(".active");
    if (activeOperation) {
        activeOperation.classList.remove('active');
    }
}

function add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2) {
    return parseFloat(num1) - parseFloat(num2);
}

function multiply(num1, num2) {
    return parseFloat(num1) * parseFloat(num2);
}

function divide(num1, num2) {
    return parseFloat(num1) / parseFloat(num2);
}

function operate(num1, num2, operator) {
    if (num2 === '0' && operator === '/') {
        return "Nice try! ;)";
    }
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return;
    }
}

// keybobard support
document.addEventListener("keydown", (event) => {
    const key = event.key;
    const button = mapKeyToButton(key);
    if (key === "Enter") {
        event.preventDefault(); // prevent enter from pressing last clicked item and instead presses = sign
    }
    if (button) {
        button.click();
        if (!(button.classList.contains("add") || button.classList.contains("subtract") || button.classList.contains("multiply") || button.classList.contains("divide"))) {
            button.style.filter = "brightness(80%)";
        }
    }
});

document.addEventListener("keyup", (event) => {
    const key = event.key;
    const button = mapKeyToButton(key);
    if (button) {
        if (!(button.classList.contains("add") || button.classList.contains("subtract") || button.classList.contains("multiply") || button.classList.contains("divide"))) {
            button.style.filter = "";
        }
    }  
});

function mapKeyToButton(key) {
    const keyMap = {
        '0': '.zero',
        '1': '.one',
        '2': '.two',
        '3': '.three',
        '4': '.four',
        '5': '.five',
        '6': '.six',
        '7': '.seven',
        '8': '.eight',
        '9': '.nine',
        '+': '.add',
        '-': '.subtract',
        '*': '.multiply',
        '/': '.divide',
        '%': '.percentage',
        '.': '.decimal',
        'Enter': '.equals',
        '=': '.equals',
        'Backspace': '.backspace',
        'c': '.clear',
        'C': '.clear',
    };

    return document.querySelector(keyMap[key]);
}