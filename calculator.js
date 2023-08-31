const add = (num, num2) => {
  return num + num2;
};

const subtract = (num, num2) => {
  return num - num2;
};

const divide = (num, num2) => {
  return num2 === 0 ? "Can't divide by 0" : num / num2;
};

const multiply = (num, num2) => {
  return num * num2;
};

const operate = (operater, num, num2) => {
  const castNum = Number(num);
  const castNum2 = Number(num2);

  switch (operater) {
    case "+":
      return add(castNum, castNum2);
    case "-":
      return subtract(castNum, castNum2);
    case "/":
      return divide(castNum, castNum2);
    case "*":
      return multiply(castNum, castNum2);
    default:
      return "Invalid operation";
  }
};
