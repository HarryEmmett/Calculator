const numberButtons = document.querySelectorAll(".numbers");
const operationButtons = document.querySelectorAll(".operations");
const clearButton = document.querySelector("#clear-button");
const deleteButton = document.querySelector("#delete-button");

const topDisplay = document.querySelector(".hidden-div");
const bottomDisplay = document.querySelector(".content-div");

let bottomDisplayValue;
let topDisplayValue;
let currentOperation;

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
    current += `${operator}`;
  }
  if (newVal) {
    current += `${newVal}`;
  }

  topDisplayValue = current;
  return current;
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
    // TODO check if repeated operations && cant have two operations in a row;

    // if (/(.).*\1/.test(generated)) {
    //   topDisplayValue = topDisplayValue.slice(0, -1);
    //   return alert("naughty naughty no repeated operations");
    // }

    if (
      e.target.value === "+" ||
      e.target.value === "-" ||
      e.target.value === "/" ||
      e.target.value === "*"
    ) {
      currentOperation = e.target.value;
    }

    if (e.target.value === "=") {
      if (
        currentOperation === "+" ||
        currentOperation === "-" ||
        currentOperation === "/" ||
        currentOperation === "*"
      ) {
        const num1 = topDisplayValue.split(currentOperation)[0];
        const num2 = topDisplayValue.split(currentOperation)[1];

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
        e.target.value
      )}`;
    }
  });
});

clearButton.addEventListener("click", (e) => {
  topDisplay.innerText = "";
  bottomDisplay.innerText = 0;
  topDisplayValue = undefined;
  bottomDisplayValue = undefined;
});

deleteButton.addEventListener("click", (e) => {
  if (!topDisplayValue) {
    alert("Nothing to delete");
  } else {
    topDisplayValue = topDisplayValue.slice(0, -1);
    topDisplay.innerText = topDisplayValue;
  }
});
