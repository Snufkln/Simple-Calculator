class Calculator {
  constructor(previousNumberTextElement, currentNumberTextElement) {
    this.previousNumberTextElement = previousNumberTextElement;
    this.currentNumberTextElement = currentNumberTextElement;
    this.clear();
  }
  clear() {
    this.currentNumber = "";
    this.previousNumber = "";
    this.operation = undefined;
  }
  delete() {
    this.currentNumber = this.currentNumber.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentNumber.includes(".")) return;
    this.currentNumber = this.currentNumber.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentNumber === "") return;
    if (this.previousNumber !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousNumber = this.currentNumber;
    this.currentNumber = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousNumber);
    const current = parseFloat(this.currentNumber);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "/":
        computation = prev / current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "-":
        computation = prev - current;
        break;
      default:
        return;
    }
    this.currentNumber = computation;
    this.operation = undefined;
    this.previousNumber = "";
  }
  updateDisplay() {
    this.currentNumberTextElement.innerText = this.currentNumber;
    if (this.operation != null) {
      this.previousNumberTextElement.innerText = `${this.previousNumber} ${this.operation}`;
    } else this.previousNumberTextElement.innerText = this.previousNumber;
  }
}
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-AC]");
const deleteButton = document.querySelector("[data-delete]");
const previousNumberTextElement = document.querySelector("[data-previous]");
const currentNumberTextElement = document.querySelector("[data-current]");

const calculator = new Calculator(
  previousNumberTextElement,
  currentNumberTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});
allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});
deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
