import { useState } from "react";
import validator from "isin-validator";
import { subscribe, unsubscribe } from "./Socket";
import Table from "./Table";

const Form = () => {
  const [ISIN, setISIN] = useState([]);
  const [ws, setWs] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    const value = event.target.isin.value;
    event.preventDefault();
    if (ISIN.includes(value)) {
      return setError("same");
    }
    setISIN([...ISIN, value]);
    setWs([...ws, subscribe(value)]);
  };

  const handleValidation = (event) => {
    const value = event.target.value;
    if (!value) {
      return setError("empty");
    } else {
      setError("");
    }
    if (validator(value)) {
      return setError("ISIN is invalid!");
    }
  };

  return (
    <div>
      <div className="heading">
        {" "}
        <h2>Stock Trading App</h2>
      </div>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label>Enter ISIN:</label>
            <input
              placeholder="Enter ISIN to add on Wishlist"
              name="isin"
              type="text"
              onChange={handleValidation}
            />
            <p>{error ? error : null}</p>
          </div>
          <div className="button-row">
            <input type="submit" />
          </div>
        </form>
      </div>
      <Table
        wsArr={ws}
        isinArr={ISIN}
        setIsinArr={setISIN}
        unsubscribe={unsubscribe}
      />
    </div>
  );
};
export default Form;
