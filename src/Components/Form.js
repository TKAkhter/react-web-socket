import { useState } from "react";
import validator from "isin-validator";
import { subscribe } from "./Socket";
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
    setWs([...ws,subscribe(value)]);
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
    console.log(
      "🚀 ~ file: Socket.js ~ line 69 ~ handleValidation ~ event",
      event.target.value
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your name:
          <input name="isin" type="text" onChange={handleValidation} />
        </label>
        <p>{error ? error : null}</p>
        <input type="submit" />
      </form>
      <Table wsArr={ws} isinArr={ISIN} />
    </>
  );
};
export default Form;
