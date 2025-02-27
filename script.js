const buttons = document.querySelectorAll(".calcButton");
const display = document.querySelector(".display");

const operators = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  X: (a, b) => a * b,
  "/": (a, b) => a / b,
};

let currentInput = "";
let firstNumber = null;
let operator = null;
let secondNumber = null;
let result = null;

function updateDisplay(value) {
  display.textContent = value;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const { value } = button;

    if (!isNaN(value) || value === ".") {
      currentInput += value;
      updateDisplay(currentInput);
    } else if (value === "AC") {
      currentInput = "";
      firstNumber = null;
      operator = null;
      secondNumber = null;
      result = null;
      updateDisplay(0);
    } else if (value in operators) {
      if (currentInput === "" && result !== null) {
        firstNumber = result;
      } else {
        firstNumber = parseFloat(currentInput);
      }
      operator = value;
      currentInput = "";
    } else if (value === "=") {
      secondNumber = parseFloat(currentInput);

      if (firstNumber !== null && operator && secondNumber !== null) {
        result = operators[operator](firstNumber, secondNumber);

        updateDisplay(result);

        currentInput = "";
        firstNumber = result;
        operator = null;
        secondNumber = null;
      }
    } else if (value === "delete") {
      currentInput = currentInput.slice(0, -1);

      updateDisplay(currentInput || 0);
    }
  });
});
