const numberButtons = document.querySelectorAll(".numbers");
const operationButtons = document.querySelectorAll(".operations");
const clearButton = document.querySelector("#clear-button");
const deleteButton = document.querySelector("#delete-button");

const topDisplay = document.querySelector(".hidden-div");
const bottomDisplay = document.querySelector(".content-div");

let bottomDisplayValue;
let topDisplayValue;
let currentOperation;

const addNumber = (value) => {
  if (topDisplayValue && topDisplayValue !== "0") {
    topDisplayValue += value;
    topDisplay.innerText = topDisplayValue;
  } else {
    topDisplayValue = value;
    topDisplay.innerText = value;
  }
};

const validOperation = (value) => {
  if (bottomDisplayValue && !topDisplayValue) {
    return value === "." || value === "=";
  }

  if (!topDisplayValue) {
    return operations.includes(value) || value === "=";
  }
  if (value === "-") {
    return topDisplayValue === "-";
  }

  return (
    operations.includes(
      topDisplayValue?.substring(topDisplayValue.length - 1)
    ) && operations.includes(value)
  );
};

const handleOperation = (value) => {
  if (validOperation(value)) {
    return alert("Invalid selection");
  }

  if (bottomDisplayValue === "Can't divide by 0") {
    return alert("Please clear before contiuning");
  }

  const numbers = topDisplayValue?.split(` ${currentOperation} `);

  // add a 0 if "." is pressed
  if (value === ".") {
    if (!topDisplayValue || topDisplayValue === "-") {
      let modifyDecimal = `0${value}`;
      if (topDisplayValue) {
        modifyDecimal = `-${modifyDecimal}`;
      }
      topDisplayValue = modifyDecimal;
      topDisplay.innerText = modifyDecimal;
      return;
    }

    if (operations.includes(topDisplayValue[topDisplayValue.length - 2])) {
      topDisplayValue += ` 0${value}`;
      topDisplay.innerText += ` 0${value}`;
      return;
    }

    if (numbers[1] === " -") {
      topDisplayValue += `0${value}`;
      topDisplay.innerText += `0${value}`;
      return;
    }

    if (numbers.length === 1 && numbers[0].includes(".")) {
      return alert("invalid operation");
    }

    if (numbers.length === 2 && numbers[1].includes(".")) {
      return alert("invalid operation");
    }

    topDisplayValue += `${value}`;
    topDisplay.innerText += `${value}`;

    return;
  }

  if (value === "-") {
    if (
      operations.includes(topDisplayValue?.[topDisplayValue?.length - 2]) &&
      !numbers[1]
    ) {
      console.log("1");
      topDisplayValue += ` -`;
      topDisplay.innerText += ` -`;
      return;
    } else {
      if (!bottomDisplayValue && topDisplayValue && numbers?.[1]) {
        return alert("Invalid operation");
      }

      if (!topDisplayValue) {
        topDisplayValue = `${value}`;
        topDisplay.innerText = `${topDisplayValue}`;
        currentOperation = value;
        return;
      } 
    }
  }

  if (value === "+" || value === "/" || value === "*" || value === "-") {
    if (!topDisplayValue?.split(` ${currentOperation} `)[1]) {
      topDisplayValue = topDisplayValue?.split(` ${currentOperation} `)[0];
      currentOperation = value;
    } else {
      return alert("Invalid operation");
    }
  }

  if (value === "=") {
    if (!topDisplayValue.split(` ${currentOperation} `)[1]) {
      return alert("Enter two numbers");
    }
    const result = operate(
      currentOperation,
      bottomDisplayValue || topDisplayValue.split(` ${currentOperation} `)[0],
      topDisplayValue.split(` ${currentOperation} `)[1]
    );
    topDisplayValue = undefined;
    topDisplay.innerText = "";
    bottomDisplay.innerText = result;
    bottomDisplayValue = result;
    currentOperation = undefined;
  } else {
    if (!topDisplayValue) {
      bottomDisplayValue
        ? (topDisplayValue = `${bottomDisplayValue} ${value} `)
        : (topDisplayValue = value);
      topDisplay.innerText = topDisplayValue;
      currentOperation = value;
    } else {
      if (numbers.length === 1) {
        topDisplayValue += ` ${value} `;
        topDisplay.innerText = ` ${topDisplayValue} `;
        currentOperation = value;
      } else {
        topDisplayValue += ` ${value} `;
        topDisplay.innerText = ` ${topDisplayValue} `;
        currentOperation = value;
      }
    }
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
  if (!topDisplayValue) {
    alert("Nothing to delete");
  } else {
    if (topDisplayValue.substring(topDisplayValue.length - 1) === " ") {
      topDisplayValue = topDisplayValue.slice(0, -2);
    } else {
      topDisplayValue = topDisplayValue.slice(0, -1);
    }
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
      addNumber(
        e.code.split("Digit")[1]
          ? e.code.split("Digit")[1]
          : e.code.split("Numpad")[1]
      );
    }
  }
});
