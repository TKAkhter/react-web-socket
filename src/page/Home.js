import { useState, useEffect } from "react";
import validator from "isin-validator";
import { subscribe, unsubscribe } from "../components/Socket";
import Table from "../components/Table/Table";
import "./Form.css";
// import Modal from "../components/Modal";

const Home = () => {
  const [ISIN, setISIN] = useState([]);
  const [ws, setWs] = useState([]);
  const [error, setError] = useState("");
  const [validClass, setValidClass] = useState("");

  const handleSubmit = (event) => {
    const value = event.target.isin.value;
    event.preventDefault();
    if (!value) {
      setValidClass("error");
      return setError("empty");
    }
    if (ISIN.includes(value)) {
      setValidClass("error");
      return setError("ISIN is already in Watch List");
    }
    setISIN([...ISIN, value]);
    setWs([...ws, subscribe(value)]);
  };

  const handleValidation = (event) => {
    const value = event.target.value;
    if (!value) {
      setValidClass("error");
      return setError("Please provide a valid ISIN");
    } else {
      setValidClass("success");
      setError("");
    }
    if (validator(value)) {
      setValidClass("error");
      return setError("ISIN is invalid!");
    }
  };

  useEffect(() => {
    ws.map((ws) => {
        console.log("🚀 ~ file: Home.js ~ line 47 ~ //ws.map ~ ws", ws);
      ws.onclose = function (event) {
        alert('Prices are out of Sync. Please reload page')
        console.log(
          "Socket is closed. Reconnect will be attempted in 5 seconds",
          event.reason
        );
        setTimeout(function () {
            subscribe(ISIN);
        }, 5000);
      };
      return () => {};
    });
    return () => {};
  }, [ws, ISIN]);

  return (
    <div>
      <div className="heading">
        <h2>Stock Trading App</h2>
      </div>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label>Enter ISIN:</label>
            <input
              className={validClass}
              placeholder="Enter ISIN to add on Wishlist"
              name="isin"
              type="text"
              onChange={handleValidation}
            />
            <p className="invalid-error">{error ? error : null}</p>
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
export default Home;
