const Value = ({ name, type, value, setValue }) => {
  return (
    <div
      className="border border-2 border-black rounded-3 p-2 bg-secondary-subtle"
      style={{ width: "fit-content" }}
    >
      <h1 className="text-primary text-center">{name || "VALUE"}</h1>
      <div className="d-flex justify-content-between align-items-center gap-2">
        <button
          className="btn btn-danger px-4"
          onClick={() => setValue((p) => p - 1)}
        >
          &minus;
        </button>
        <div className="fs-3 fw-bold">
          {type === "real" ? value.toFixed(2) : Math.round(value)}
        </div>
        <button
          className="btn btn-success px-4"
          onClick={() => setValue((p) => p + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Value;
