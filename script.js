const buttons = document.querySelectorAll(".calcButton");
const display = document.querySelector(".display");

const operators = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  X: (a, b) => a * b,
  "/": (a, b) => a / b,
};

function updateDisplay(value) {
  display.textContent = value;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => handleButtonClick(button.value));
});

let currentInput = "";
let firstNumber = null;
let operator = null;
let result = null;

function handleButtonClick(value) {
  if (!isNaN(value) || value === ".") {
    handleNumberInput(value);
  } else if (value === "AC") {
    resetCalculator();
  } else if (value in operators) {
    handleOperatorInput(value);
  } else if (value === "=") {
    handlesEquals();
  } else if (value === "delete") {
    handleDelete();
  }
}

function handleNumberInput(value) {
  currentInput += value;
  updateDisplay(currentInput);
}

function handleOperatorInput(value) {
  if (currentInput === "" && result !== null) {
    firstNumber = result;
  } else if (firstNumber !== null && operator && currentInput !== "") {
    const secondNumber = parseFloat(currentInput);
    result = operators[operator](firstNumber, secondNumber);
    updateDisplay(result);
    firstNumber = result;
  } else {
    firstNumber = parseFloat(currentInput);
  }
  operator = value;
  currentInput = "";
}

function handlesEquals() {
  if (firstNumber !== null && operator && currentInput !== "") {
    const secondNumber = parseFloat(currentInput);
    result = operators[operator](firstNumber, secondNumber);

    updateDisplay(result);
    resetIntermediateStates();
  }
}

function handleDelete() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput || "0");
}

function resetCalculator() {
  currentInput = "";
  firstNumber = null;
  operator = null;
  result = null;
  updateDisplay("0");
}

function resetIntermediateStates() {
  currentInput = "";
  firstNumber = result;
  operator = null;
}
