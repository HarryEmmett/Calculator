const numberButtons = document.querySelectorAll(".numbers");
const operationButtons = document.querySelectorAll(".operations");
const clearButton = document.querySelector("#clear-button");
const deleteButton = document.querySelector("#delete-button");

const topDisplay = document.querySelector(".hidden-div");
const bottomDisplay = document.querySelector(".content-div");

const operations = ["+", "-", "/", "*"];

let bottomDisplayValue;
let topDisplayValue;
let currentOperation;

const checkRepeats = (num, operater) => {
  return (
    num?.includes(operater) ||
    (num?.substring(topDisplayValue.length - 1) === "." &&
      operations?.includes(operater))
  );
};

const handleOperatorSelection = (operator) => {
  const regex = /[+\/\-*]$/;
  let values;

  values = topDisplayValue.split(currentOperation);
 
  if (operator === ".") {
    if (regex.test(topDisplayValue) && !values[1]) {
      // Add a 0 if second number initated with "."
      topDisplayValue += `0`;
    }
  }

  if (currentOperation && operator !== ".") {
    if (regex.test(topDisplayValue)) {
      let string = `${values[0]} ${operator} `;
      if (values[1]) {
        string += `${values[1]}`;
      }

      return (topDisplayValue = string);
    }
  }

  return (topDisplayValue += `${operator}`);
};

const generateTopText = (newVal, operator = false) => {
  if (topDisplayValue === "0" && !operator) {
    return (topDisplayValue = newVal);
  }

  if (!topDisplayValue) {
    if (operator) {
      return (topDisplayValue = `0${operator}`);
    }

    return (topDisplayValue = newVal);
  }

  if (operator) {
    topDisplayValue = handleOperatorSelection(operator);
  }

  if (newVal) {
    topDisplayValue += `${newVal}`;
  }

  return topDisplayValue;
};

const handleOperation = (value) => {
  const num1 = topDisplayValue?.split(currentOperation)[0];
  const num2 = topDisplayValue?.split(currentOperation)[1];

  if (
    (num2 && checkRepeats(num2, value)) ||
    (value === currentOperation && num2)
  ) {
    return alert("invalid selection");
  }

  if (!num2 && checkRepeats(num1, value)) {
    if (
      !operations.includes(
        topDisplayValue?.substring(topDisplayValue.length - 1)
      )
    ) {
      return alert("invalid selection");
    }
  }

  if (value === "+" || value === "-" || value === "/" || value === "*") {
    if (!topDisplayValue) {
      return alert("Select a number first");
    }
    
    if (topDisplayValue.split(currentOperation)[1]) {
      return alert("You have already selected two numbers");
    }

    currentOperation = value;
  }

  if (value === "=") {
    if (
      currentOperation === "+" ||
      currentOperation === "-" ||
      currentOperation === "/" ||
      currentOperation === "*"
    ) {
      if (num1 && num2) {
        bottomDisplayValue = operate(currentOperation, num1, num2);
        if (bottomDisplayValue !== "Can't divide by 0") {
          topDisplayValue = bottomDisplayValue.toString();
          topDisplay.innerText = bottomDisplayValue.toString();
        } else {
          topDisplayValue = undefined;
          topDisplay.innerText = "";
        }

        bottomDisplay.innerText = bottomDisplayValue.toString();
      } else {
        alert("Enter 2 numbers!");
      }
    }
  } else {
    topDisplay.innerText = `${generateTopText(undefined, value)}`;
  }
};

numberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    topDisplay.innerText = `${generateTopText(e.target.value)}`;
  });
});

operationButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleOperation(e.target.value);
  });
});

clearButton.addEventListener("click", (e) => {
  topDisplay.innerText = "";
  bottomDisplay.innerText = 0;
  topDisplayValue = undefined;
  bottomDisplayValue = undefined;
  currentOperation = undefined;
});

deleteButton.addEventListener("click", (e) => {
  if (!topDisplayValue) {
    alert("Nothing to delete");
  } else {
    topDisplayValue = topDisplayValue.slice(0, -1);
    topDisplay.innerText = topDisplayValue;
  }
});

document.addEventListener("keypress", (e) => {
  if (keys.includes(e.code)) {
    if (
      e.code === "Minus" ||
      e.code === "Equal" ||
      e.code === "Slash" ||
      e.code === "Period" ||
      e.code === "NumpadAdd" ||
      e.code === "NumpadMultiply" ||
      e.code === "NumpadDivide" ||
      e.code === "NumpadSubtract" ||
      e.code === "NumpadDecimal" ||
      e.code === "Digit8"
    ) {
      if (e.shiftKey) {
        switch (e.code) {
          case "Equal":
            return handleOperation("+");
          case "Digit8":
            return handleOperation("*");
        }
      }

      if (e.code !== "Digit8") {
        switch (e.code) {
          case "Minus":
          case "NumpadSubtract":
            return handleOperation("-");
          case "Slash":
          case "NumpadDivide":
            return handleOperation("/");
          case "Period":
          case "NumpadDecimal":
            return handleOperation(".");
          case "Equal":
            return handleOperation("=");
          case "NumpadAdd":
            return handleOperation("+");
          case "NumpadMultiply":
            return handleOperation("*");
          default:
            return "Invalid key";
        }
      }
    }

    if (!e.shiftKey) {
      topDisplay.innerText = `${generateTopText(
        e.code.split("Digit")[1]
          ? e.code.split("Digit")[1]
          : e.code.split("Numpad")[1]
      )}`;
    }
  }
});
