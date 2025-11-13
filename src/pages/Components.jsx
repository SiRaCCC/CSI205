import Value from "../components/Value";
import Adder from "../components/Adder";
import Timer from "../components/Timer";
import Temperature from "../components/Temperature";
import { useState } from "react";

const Components = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div className="container text-center py-4 rounded-3 border border-1 border-primary bg-primary-subtle">
      <div className="row justify-content-center align-items-start gy-4">
        <div className="col-md-4 d-flex flex-column align-items-center gap-3">
          <Value
            name="COUNTER"
            value={counter}
            setValue={setCounter}
            type="real"
          />
          <Timer />
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <Adder />
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-md-10 d-flex justify-content-center">
          <Temperature />
        </div>
      </div>
    </div>
  );
};

export default Components;
