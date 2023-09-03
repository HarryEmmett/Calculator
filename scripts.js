const numberButtons = document.querySelectorAll(".numbers");
const operationButtons = document.querySelectorAll(".operations");
const clearButton = document.querySelector("#clear-button");
const deleteButton = document.querySelector("#delete-button");

const topDisplay = document.querySelector(".hidden-div");
const bottomDisplay = document.querySelector(".content-div");

let currentOperation;
let number1 = "";
let number2 = "";

const addNumber = (value) => {
  if (value === ".") {
    if (!number1 || (!number2 && currentOperation)) {
      value = "0.";
    }

    if (
      (number1?.includes(".") && !currentOperation) ||
      number2?.includes(".")
    ) {
      return alert("No double decimal");
    }
  }
  let updatedNumber = !currentOperation
    ? (number1 += value)
    : (number2 += value);
  !currentOperation ? (number1 = updatedNumber) : (number2 = updatedNumber);

  bottomDisplay.innerHTML = `${number1} ${currentOperation || ""} ${
    number2 || ""
  }`;
};

const handleOperation = (value) => {
  if (value === "-") {
    if (!number1) {
      number1 = value;
      bottomDisplay.innerHTML = "-";
      return;
    }
  }

  if (operations.includes(value) && !number1) {
    return alert("Invalid selection");
  }

  if (value === "=") {
    if (!number1 || !number2 || !currentOperation) {
      return alert("Invalid selection");
    }

    let result = operate(currentOperation, number1, number2);

    if (typeof result === "number") {
      result = Math.round(result * 10000) / 10000;
    }

    bottomDisplay.innerHTML = result.toString();
    topDisplay.innerText = typeof result === "number" ? result.toString() : "";
    number1 = typeof result === "number" ? result.toString() : "0";
    number2 = "";
    currentOperation = undefined;
    return;
  }

  currentOperation = value;
  bottomDisplay.innerHTML = `${number1} ${currentOperation || ""} ${
    number2 || ""
  }`;
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

clearButton.addEventListener("click", () => {
  topDisplay.innerText = "";
  bottomDisplay.innerText = "0";
  currentOperation = undefined;
  number1 = "";
  number2 = "";
});

deleteButton.addEventListener("click", () => {
  if (!number1) {
    alert("Nothing to delete");
  } else {
    if (number2) {
      number2 = number2.slice(0, -1);
      if (number2[number2.length - 1] === ".") {
        number2 = number2.slice(0, -1);
      }
    } else {
      currentOperation === undefined;
      number1 = number1.slice(0, -1);
      if (number1[number1.length - 1] === ".") {
        number1 = number1.slice(0, -1);
      }
    }

    if (!number2) {
      currentOperation = undefined;
    }
    bottomDisplay.innerText = `${number1} ${currentOperation || ""} ${
      number2 || ""
    }`;
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
            return addNumber(".");
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
