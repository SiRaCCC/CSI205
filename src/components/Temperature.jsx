import { useEffect, useState } from "react";
import Value from "./Value";

const Temperature = () => {
  // set value
  const [celsius, setCelsius] = useState(0);
  const [fahrenheit, setFahrenheit] = useState(32);
  const [kelvin, setKelvin] = useState(273.15);

  // change k f
  useEffect(() => {
    setFahrenheit(celsius * 9 / 5 + 32);
    setKelvin(celsius + 273.15);
  }, [celsius]);

  // set value to c
  const handleChange = (name, newValue) => {
    if (name === "CELSIUS") {
      setCelsius(newValue);
    } else if (name === "FAHRENHEIT") {
      setCelsius((newValue - 32) * 5 / 9);
    } else if (name === "KELVIN") {
      setCelsius(newValue - 273.15);
    }
  };

  return (
    <div
      className="border border-2 border-black rounded-3 p-3 bg-white"
      style={{ width: "fit-content" }}
    >
      <h1 className="text-primary text-center mb-3">TEMPERATURE</h1>

      {/* แสดงค่าจาก Celsius */}
      <div className="d-flex gap-3 mb-3 justify-content-around">
        <div className="badge bg-primary fs-5">{celsius.toFixed(2)}°C</div>
        <div className="badge bg-primary fs-5">{fahrenheit.toFixed(2)}°F</div>
        <div className="badge bg-primary fs-5">{kelvin.toFixed(2)}°K</div>
      </div>

      {/* Value controls */}
      <div className="d-flex gap-2">
        <Value
          name="CELSIUS"
          value={celsius}
          setValue={(val) => handleChange("CELSIUS", val)}
          type="real"
        />
        <Value
          name="FAHRENHEIT"
          value={fahrenheit}
          setValue={(val) => handleChange("FAHRENHEIT", val)}
          type="real"
        />
        <Value
          name="KELVIN"
          value={kelvin}
          setValue={(val) => handleChange("KELVIN", val)}
          type="real"
        />
      </div>
    </div>
  );
};

export default Temperature;
