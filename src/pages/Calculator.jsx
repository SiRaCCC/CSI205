import { useState } from "react";
import { Button } from "react-bootstrap";

const Calculator = () => {
  const [screen, setScreen] = useState("0");
  const [state, setState] = useState("S0");
  const [valueOperator, setValueOperator] = useState("");
  const [valueNumber1, setValueNumber1] = useState("");
  const [valueNumber2, setValueNumber2] = useState("");

  const numberClicked = (number) => {
    if (number === "." && screen.includes(".")) return;
    if (state === "S0") {
      setScreen(number.toString());
      setValueNumber1(number.toString());
      setState("S1");
    } else if (state === "S1") {
      setScreen(screen === "0" ? number.toString() : screen + number);
      setValueNumber1(screen === "0" ? number.toString() : screen + number);
    } else if (state === "S2") {
      setScreen(number.toString());
      setValueNumber2(number.toString());
      setState("S3");
    } else if (state === "S3") {
      setScreen(screen + number);
      setValueNumber2(screen + number);
    }
  };

  const operatorClicked = (operator) => {
    if (state === "S3" && valueNumber2 !== "") {
      const result = calculatePartial();
      setScreen(result.toString());
      setValueNumber1(result.toString());
      setValueNumber2("");
    }
    setValueOperator(operator);
    setState("S2");
  };

  const calculatePartial = () => {
    const num1 = parseFloat(valueNumber1);
    const num2 = parseFloat(valueNumber2);
    if (isNaN(num1) || isNaN(num2)) return num1 || 0;
    switch (valueOperator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "×":
        return num1 * num2;
      case "÷":
        return num2 === 0 ? 0 : num1 / num2;
      default:
        return num1;
    }
  };

  const calculate = () => {
    const num1 = parseFloat(valueNumber1);
    const num2 = parseFloat(valueNumber2);
    if (isNaN(num1) || isNaN(num2)) return setScreen("Error");
    let result = 0;
    switch (valueOperator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "×":
        result = num1 * num2;
        break;
      case "÷":
        if (num2 === 0) return setScreen("Error");
        result = num1 / num2;
        break;
      default:
        result = num1;
    }
    setScreen(result.toString());
    setValueNumber1(result.toString());
    setValueNumber2("");
    setState("S0");
  };

  const ceClicked = () => {
    setScreen("0");
    setState("S0");
    setValueOperator("");
    setValueNumber1("");
    setValueNumber2("");
  };

  const toggleSign = () => {
    const currentValue = parseFloat(screen);
    if (isNaN(currentValue)) return;
    const newValue = (-currentValue).toString();
    setScreen(newValue);
    if (state === "S1") setValueNumber1(newValue);
    if (state === "S3") setValueNumber2(newValue);
  };

  return (
    <div
      className="border border-2 border-dark rounded-4 m-auto my-4 px-4 py-4 text-center bg-light shadow-lg"
      style={{
        maxWidth: "500px",
        width: "90vw",
      }}
    >
      {/* จอแสดงผล */}
      <div
        className="border border-2 border-dark bg-white text-end p-3 rounded-3 mb-4 fs-2 fw-bold"
        style={{
          height: "80px",
          overflow: "hidden",
        }}
      >
        {screen}
      </div>

      {/* ปุ่มทั้งหมด */}
      <div
        className="d-grid gap-3"
        style={{
          gridTemplateColumns: "repeat(5, 1fr)",
        }}
      >
        <Button size="lg" variant="secondary" disabled>
          MC
        </Button>
        <Button size="lg" variant="secondary" disabled>
          MR
        </Button>
        <Button size="lg" variant="secondary" disabled>
          M+
        </Button>
        <Button size="lg" variant="secondary" disabled>
          M&minus;
        </Button>
        <Button size="lg" variant="danger" onClick={ceClicked}>
          CE
        </Button>

        <Button size="lg" variant="secondary" onClick={() => numberClicked(7)}>
          7
        </Button>
        <Button size="lg" variant="secondary" onClick={() => numberClicked(8)}>
          8
        </Button>
        <Button size="lg" variant="secondary" onClick={() => numberClicked(9)}>
          9
        </Button>
        <Button
          size="lg"
          variant="warning"
          onClick={() => operatorClicked("÷")}
        >
          &divide;
        </Button>
        <Button size="lg" variant="warning" disabled>
          R
        </Button>

        <Button size="lg" variant="secondary" onClick={() => numberClicked(4)}>
          4
        </Button>
        <Button size="lg" variant="secondary" onClick={() => numberClicked(5)}>
          5
        </Button>
        <Button size="lg" variant="secondary" onClick={() => numberClicked(6)}>
          6
        </Button>
        <Button
          size="lg"
          variant="warning"
          onClick={() => operatorClicked("×")}
        >
          &times;
        </Button>
        <Button size="lg" variant="warning" disabled>
          %
        </Button>

        <Button size="lg" variant="secondary" onClick={() => numberClicked(1)}>
          1
        </Button>
        <Button size="lg" variant="secondary" onClick={() => numberClicked(2)}>
          2
        </Button>
        <Button size="lg" variant="secondary" onClick={() => numberClicked(3)}>
          3
        </Button>
        <Button
          size="lg"
          variant="warning"
          onClick={() => operatorClicked("-")}
        >
          &minus;
        </Button>
        <Button size="lg" variant="warning" disabled>
          1/x
        </Button>

        <Button size="lg" variant="secondary" onClick={() => numberClicked(0)}>
          0
        </Button>
        <Button
          size="lg"
          variant="secondary"
          onClick={() => numberClicked(".")}
        >
          .
        </Button>
        <Button size="lg" variant="secondary" onClick={toggleSign}>
          +/-
        </Button>
        <Button
          size="lg"
          variant="warning"
          onClick={() => operatorClicked("+")}
        >
          +
        </Button>
        <Button
          size="lg"
          variant="success"
          className="col-span-4"
          onClick={calculate}
        >
          =
        </Button>
      </div>
    </div>
  );
};

export default Calculator;
