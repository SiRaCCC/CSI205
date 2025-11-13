import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const BallAnimation = () => {
  // set value
  const [running, setRunning] = useState(false);
  const [lastSelected, setLastSelected] = useState("none");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [angle, setAngle] = useState(0);

  //set field
  const fieldWidth = 850;
  const fieldHeight = 500;
  const ballDiameter = 150;
  const border = 2;
  //set ball move
  const maxX = fieldWidth - ballDiameter - border;
  const maxY = fieldHeight - ballDiameter - border;
  const vx = 6;
  const vy = 6;

  // ball img
  const ballImages = {
    none: null, // ไม่มีภาพ (แค่สีพื้นหลัง)
    basketball: "./Picture/basketball.jpg", 
    football: "./Picture/football.jpg", 
    volleyball: "./Picture/volleyball.jpg", 
    human: "./Picture/human.jpg", 
    cartoon: "./Picture/cartoon.jpg", 
  };

  // Ball move calculation
  useEffect(() => {
    let goRight = true;
    let goDown = true;

    const interval = setInterval(() => {
      if (running) {
        if (goRight) {
          setX((prevX) => {
            if (prevX >= maxX) {
              goRight = false;
              setAngle((prevAngle) => prevAngle - 3);
              return prevX - vx;
            }
            return prevX + vx;
          });
        } else {
          setX((prevX) => {
            if (prevX <= 0) {
              goRight = true;
            }
            setAngle((prevAngle) => prevAngle + 3);
            return prevX - vx;
          });
        }

        if (goDown) {
          setY((prevY) => {
            if (prevY >= maxY) {
              goDown = false;
            }
            setAngle((prevAngle) => prevAngle + 3);
            return prevY + vy;
          });
        } else {
          setY((prevY) => {
            if (prevY <= 0) {
              goDown = true;
            }
            setAngle((prevAngle) => prevAngle - 3);
            return prevY - vy;
          });
        }
      }
    }, 25);

    return () => clearInterval(interval);
  }, [running]);

  const handleBallClick = (type) => {
    setLastSelected(type);
  };

  const handleRunClick = () => {
    setRunning((prevRunning) => !prevRunning);
  };

  return (
    <div className="text-center bg-primary-subtle p-3 rounded-3 border border-1 border-primary m-auto" style={{width:'fit-content'}}>
      <div
        id="field"
        className="border border-dark rounded-3 my-3 mx-3"
        style={{ 
          width: `${fieldWidth}px`, 
          height: `${fieldHeight}px`, 
          position: "relative", 
          backgroundImage: "url('./Picture/background.jpeg')", 
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          id="ball"
          className="rounded-circle"
          style={{
            width: `${ballDiameter}px`,
            height: `${ballDiameter}px`,
            backgroundImage: lastSelected !== "none" ? `url(${ballImages[lastSelected]})` : "none", 
            backgroundColor: lastSelected === "none" ? "gray" : "transparent", 
            backgroundSize: "cover",
            position: "absolute",
            top: `${y}px`,
            left: `${x}px`,
            transform: `rotate(${angle}deg)`,
          }}
        />
      </div>
      <div>
        <Button variant={running ? "warning" : "success"} onClick={handleRunClick}>
          {running ? (
            <>
              <i className="bi bi-pause"></i>&nbsp;Pause
            </>
          ) : (
            <>
              <i className="bi bi-play"></i>&nbsp;Play
            </>
          )}
        </Button>
      </div>
      {/* change ball pic button */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Button
          variant={lastSelected === "none" ? "secondary" : "outline-primary"}
          onClick={() => handleBallClick("none")}
        >
          None
        </Button>
        <Button
          variant={lastSelected === "basketball" ? "primary" : "outline-primary"}
          onClick={() => handleBallClick("basketball")}
        >
          Basketball
        </Button>
        <Button
          variant={lastSelected === "football" ? "primary" : "outline-primary"}
          onClick={() => handleBallClick("football")}
        >
          Football
        </Button>
        <Button
          variant={lastSelected === "volleyball" ? "primary" : "outline-primary"}
          onClick={() => handleBallClick("volleyball")}
        >
          Volleyball
        </Button>
        <Button
          variant={lastSelected === "human" ? "primary" : "outline-primary"}
          onClick={() => handleBallClick("human")}
        >
          Human
        </Button>
        <Button
          variant={lastSelected === "cartoon" ? "primary" : "outline-primary"}
          onClick={() => handleBallClick("cartoon")}
        >
          Cartoon
        </Button>
      </div>
    </div>
  );
};

export default BallAnimation;
