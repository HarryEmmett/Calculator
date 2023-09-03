const numberButtons = document.querySelectorAll(".numbers");
const operationButtons = document.querySelectorAll(".operations");
const clearButton = document.querySelector("#clear-button");
const deleteButton = document.querySelector("#delete-button");

const topDisplay = document.querySelector(".hidden-div");
const bottomDisplay = document.querySelector(".content-div");

let bottomDisplayValue;
let topDisplayValue;
let currentOperation;
let number1;
let number2 = 0;

const addNumber = (value) => {
  if (bottomDisplayValue && bottomDisplayValue !== "0") {
    bottomDisplayValue += value;
    bottomDisplay.innerText = bottomDisplayValue;

    if (currentOperation) {
      return (number2 = number2 ? number2 + value : value);
    }
    number1 += value;
  } else {
    bottomDisplayValue = value;
    bottomDisplay.innerText = bottomDisplayValue;
    if (currentOperation) {
      return (number2 = value);
    }
    number1 = value;
  }
};

const handleOperation = (value) => {
  if (!number1 && !topDisplayValue && value !== "." && value !== "-") {
    return alert("enter a number");
  }

  if (value === ".") {
    if (!number1 && !currentOperation) {
      bottomDisplayValue = "0" + value;
      bottomDisplay.innerText = bottomDisplayValue;
      number1 = "0.";
      return;
    }

    if (!number2 && currentOperation) {
      bottomDisplayValue += "0" + value;
      bottomDisplay.innerText = bottomDisplayValue;
      number2 = "0.";
      return;
    }

    if (!number2 && !number1?.toString().includes(".")) {
      bottomDisplayValue += value;
      bottomDisplay.innerText = bottomDisplayValue;
      number1 += value;
      return;
    }

    if (number2 && !number2.toString().includes(".")) {
      bottomDisplayValue += value;
      bottomDisplay.innerText = bottomDisplayValue;
      number2 += value;
      return;
    }
    return alert("No double decimals");
  }

  if (value === "+" || value === "-" || value === "*" || value === "/") {
    if (number1?.[number1?.length - 1] === "." || number2) {
      return alert("Invalid selection");
    }

    if (
      (value === "-" && !number1 && number1 !== 0 && !topDisplayValue) ||
      number1 === "-"
    ) {
      if (number1 === "-") {
        return alert("Invalid selection");
      }

      currentOperation = value;
      number1 = value;
      bottomDisplayValue = value;
      bottomDisplay.innerText = bottomDisplayValue;
      return;
    }
    if (currentOperation) {
      currentOperation = value;
      bottomDisplayValue = `${bottomDisplayValue.slice(0, -2)} ${value} `;
      bottomDisplay.innerText = bottomDisplayValue;
      return;
    }

    if (!topDisplayValue) {
      currentOperation = value;
      bottomDisplayValue += ` ${value} `;
      bottomDisplay.innerText += ` ${value} `;
      return;
    }

    currentOperation = value;
    bottomDisplayValue = `${bottomDisplayValue} ${value} `;
    bottomDisplay.innerText = bottomDisplayValue;
    return;
  }

  if (value === "=" && currentOperation) {
    if (!number2) {
      return alert("enter a second number");
    }
    
    const result = operate(
      currentOperation,
      topDisplayValue ? topDisplayValue : number1,
      number2
    );

    currentOperation = undefined;
    number1 = undefined;
    number2 = 0;
    topDisplayValue = result;
    bottomDisplayValue = result;
    topDisplay.innerHTML = result;
    bottomDisplay.innerHTML = result;
  }
};

numberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    addNumber(e.target.value);
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
  if (!bottomDisplayValue) {
    alert("Nothing to delete");
  } else {
    bottomDisplayValue = bottomDisplayValue.slice(0, -1);
    bottomDisplay.innerText = bottomDisplayValue;
    topDisplayValue = bottomDisplayValue.slice(0, -1);
    number1 = bottomDisplayValue?.split(` ${currentOperation} `)[0];

    if (number1[number1.length - 1] === ".") {
      number1.slice(0, -1);
      bottomDisplayValue = bottomDisplayValue.slice(0, -1);
      bottomDisplay.innerText = bottomDisplayValue;
      topDisplayValue = bottomDisplayValue.slice(0, -1);
    }
    currentOperation = undefined;
    if ((number2 = bottomDisplayValue?.split(` ${currentOperation} `)[1])) {
      number2 = bottomDisplayValue?.split(` ${currentOperation} `)[1];

      if (number2[number2.length - 1] === ".") {
        number2.slice(0, -1);
        bottomDisplayValue = bottomDisplayValue.slice(0, -1);
        bottomDisplay.innerText = bottomDisplayValue;
        topDisplayValue = bottomDisplayValue.slice(0, -1);
        currentOperation = undefined;
      }
      return;
    }
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
      addNumber(
        e.code.split("Digit")[1]
          ? e.code.split("Digit")[1]
          : e.code.split("Numpad")[1]
      );
    }
  }
});
