import { useState, useEffect } from "react";
import validator from "isin-validator";
import { subscribe, unsubscribe } from "../components/Socket";
import Table from "../components/Table/Table";
import "./Form.css";
// import Modal from "../components/Modal";

const Home = () => {
  const [ISIN, setISIN] = useState([]);
  const [ws, setWs] = useState([]);
  const [isinValue, setIsinValue] = useState("");
  const [error, setError] = useState("");
  const [validClass, setValidClass] = useState("");

  const isinClean = (isin) => isin.replace(/\s|-/g, "");

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = isinClean(event.target.isin.value);
    if (!value) {
      setValidClass("error");
      return setError("ISIN is empty, please add enter correct ISIN");
    }
    if (validator(value)) {
      setValidClass("error");
      return setError("ISIN is invalid!");
    }
    if (ISIN.includes(value)) {
      setValidClass("error");
      return setError("ISIN is already in Watch List");
    }
    setISIN([...ISIN, value]);
    const wss = subscribe(value);
    setWs(wss);
    setIsinValue("")
  };

  const handleValidation = (event) => {
    setIsinValue(event.target.value);
    let value = isinClean(event.target.value);
    value = value.replace(/\s|-/g, "");

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
    // ws.onclose = function (event) {
    //   alert(
    //     "Prices are out of Sync.App is trying to reconnect. If price doesn't change, Please reload page"
    //   );
    //   console.log(
    //     "Socket is closed. Reconnect will be attempted in 5 seconds",
    //     event.reason
    //   );
    //   setTimeout(function () {
    //     subscribe(ISIN);
    //   }, 5000);
    // };
    return () => {};
  }, [ws, ISIN]);

  return (
    <div>
      <div className="heading">
        <h2>Stock Trading App</h2>
      </div>
      <div className="card">
        <div className="input-box">
          <label>Enter ISIN:</label>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              className={validClass}
              placeholder="Enter ISIN to add on Wishlist"
              name="isin"
              type="text"
              value={isinValue}
              onChange={handleValidation}
            />
          </div>
          <div className="button-row">
            <input type="submit" />
          </div>
        </form>
        <p className="invalid-error">{error ? error : null}</p>
        <p className="info">Ex: US0378330015, US0004026250 or DE000BASF111</p>
      </div>
      <Table
        ws={ws}
        isinArr={ISIN}
        setIsinArr={setISIN}
        unsubscribe={unsubscribe}
      />
    </div>
  );
};
export default Home;
