import { useEffect, useState } from "react";

const Timer = ({name}) => {
  // set value
  const [second, setSecond] = useState(0);
  // render
  const [run, setRun] = useState(false);
  useEffect(() => {
    let timer;
    if (run) {
      timer = setInterval(() => {
        setSecond((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [run]);

  // convert to secsonds
  const convertToString = (sec) => {
    const MINUTE_SECOND = 60;
    const HOUR_SECOND = 3600;
    const DAY_SECOND = 86400;

    const day = Math.floor(sec / DAY_SECOND);

    const hour = Math.floor((sec % DAY_SECOND) / HOUR_SECOND);

    const minute = Math.floor((sec % HOUR_SECOND) / MINUTE_SECOND);

    const second = sec % MINUTE_SECOND;

    return day + "d" + hour + "h" + minute + "m" + second + "s";
  };

  // run
  const Play = () => {
    setRun((prev) => !prev);
  };

  const Reset = () => {
    setRun(false);
    setSecond(0);
  };

  return (
    <div
      className="border border-2 border-black rounded-3 p-2 bg-secondary-subtle"
      style={{ width: "fit-content" }}
    >
      <h1 className="text-primary text-center">{name || 'TIMER'}</h1>
      <input className="border rounded-3 px-auto" value={convertToString(second)} readOnly></input>
      <div className="d-flex justify-content-between mt-2">
        <button className="btn btn-danger" onClick={Reset}>
          <i className="bi bi-arrow-counterclockwise">&nbsp;</i>Reset
        </button>
        {run ? (<button className="btn btn-warning" onClick={Play}>
          <i className="bi bi-pause">&nbsp;</i>Pause
        </button>) : (<button className="btn btn-success" onClick={Play}>
          <i className="bi bi-play">&nbsp;</i>Run
        </button>)}
      </div>
    </div>
  );
};
export default Timer;
