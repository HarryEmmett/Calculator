const keys = [
  "Digit1",
  "Digit2",
  "Digit3",
  "Digit4",
  "Digit5",
  "Digit6",
  "Digit7",
  "Digit8",
  "Digit9",
  "Digit0",
  "Minus",
  "Equal",
  "Slash",
  "Period",
  "NumpadAdd",
  "NumpadMultiply",
  "NumpadDivide",
  "NumpadSubtract",
  "Numpad0",
  "Numpad1",
  "Numpad2",
  "Numpad3",
  "Numpad4",
  "Numpad5",
  "Numpad6",
  "Numpad7",
  "Numpad8",
  "Numpad9",
  "NumpadDecimal",
  "Shift",
];

const numberButtons = document.querySelectorAll(".numbers");
const operationButtons = document.querySelectorAll(".operations");
const clearButton = document.querySelector("#clear-button");
const deleteButton = document.querySelector("#delete-button");

const topDisplay = document.querySelector(".hidden-div");
const bottomDisplay = document.querySelector(".content-div");

let bottomDisplayValue;
let topDisplayValue;
let currentOperation;

const checkRepeats = (num, operater) => {
  return num?.includes(operater);
};

const generateTopText = (current, newVal, operator = false) => {
  if (!current) {
    if (operator) {
      topDisplayValue = `0${operator}`;
      return `0${operator}`;
    }
    topDisplayValue = newVal;
    return newVal;
  }
  if (operator) {
    // check +=/* is at the end of the string
    const regex = /[+\/\-*]$/;
    let values;

    if (regex.test(topDisplayValue)) {
      values = topDisplayValue.slice(0, -1).split(currentOperation);
    } else {
      values = topDisplayValue.split(currentOperation);
    }

    if (operator === ".") {
      if (regex.test(topDisplayValue) && !values[1]) {
        // Add a 0 if second number initated with "."
        current += `0`;
      }
    }

    if (currentOperation && operator !== ".") {
      if (regex.test(topDisplayValue)) {
        let string = `${values[0]}${operator}`;
        if (values[1]) {
          string += `${values[1]}`;
        }
        topDisplayValue = string;
        return string;
      }
    }
    current += `${operator}`;
  }
  if (newVal) {
    current += `${newVal}`;
  }

  topDisplayValue = current;
  return current;
};

const handleOperation = (value) => {
  const num1 = topDisplayValue?.split(currentOperation)[0];
  const num2 = topDisplayValue?.split(currentOperation)[1];

  if (num2 && checkRepeats(num2, value)) {
    return alert("invalid selection");
  }

  if (!num2 && checkRepeats(num1, value)) {
    const operations = ["+", "-", "/", "*"];
    if (
      !operations.includes(
        topDisplayValue?.substring(topDisplayValue.length - 1)
      )
    ) {
      return alert("invalid selection");
    }
  }

  if (value === currentOperation) {
    return alert("invalid selection");
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
    topDisplay.innerText = `${generateTopText(
      topDisplayValue,
      undefined,
      value
    )}`;
  }
};

numberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    topDisplay.innerText = `${generateTopText(
      topDisplayValue,
      e.target.value
    )}`;
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
            return handleOperation("-");
          case "Equal":
            return handleOperation("=");
          case "Slash":
            return handleOperation("/");
          case "Period":
            return handleOperation(".");
          case "NumpadAdd":
            return handleOperation("+");
          case "NumpadMultiply":
            return handleOperation("*");
          case "NumpadDivide":
            return handleOperation("/");
          case "NumpadSubtract":
            return handleOperation("-");
          case "NumpadDecimal":
            return handleOperation(".");
          default:
            return "Invalid key";
        }
      }
    }

    if (!e.shiftKey) {
      if (e.code.split("Digit")[1]) {
        topDisplay.innerText = `${generateTopText(
          topDisplayValue,
          e.code.split("Digit")[1]
        )}`;
      } else {
        topDisplay.innerText = `${generateTopText(
          topDisplayValue,
          e.code.split("Numpad")[1]
        )}`;
      }
    }
  }
});
