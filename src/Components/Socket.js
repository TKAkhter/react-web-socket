import { useState, useEffect, useRef } from "react";
import Table from "./Table";
import validator from "isin-validator";

const Socket = () => {
  const [isPaused, setPause] = useState(false);
  const [error, setError] = useState("");
  const [ISIN, setISIN] = useState([]);
  const [data, setdata] = useState({});

  const ws = useRef(null);

  // useEffect(() => {
  //   ws.current = new WebSocket("ws://159.89.15.214:8080/");
  //   openSocket();
  //   return () => {
  //     closeSocket();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (!ws.current) return;
  //   getDataSocket();
  // }, [isPaused]);

  const openSocket = () => {
    ws.current.onopen = () => {
      console.log("ws opened");
    };
  };

  const getDataSocket = () => {
    ws.current.onmessage = (e) => {
      if (isPaused) return;
      const message = JSON.parse(e.data);
      console.log("e", message);
      setdata(message);
    };
  };

  const closeSocket = () => {
    ws.current.onclose = () => console.log("ws closed");
    openSocket();
  };

  const subscribe = (isin) => {
    const msg = {
      subscribe: isin,
    };
    console.log("🚀 ~ file: Socket.js ~ line 50 ~ subscribe ~ isin", isin);
    ws.current.send(JSON.stringify(msg));
  };

  const unsubscribe = (isin, newISIN) => {
    // const msg = {
    //   unsubscribe: isin,
    // };
    // console.log("🚀 ~ file: Socket.js ~ line 58 ~ unsubscribe ~ isin", isin);
    // ws.current.send(JSON.stringify(msg));
    // setISIN([...ISIN, newISIN]);
  };

  const handleSubmit = (event) => {
    const value = event.target.isin.value;
    event.preventDefault();
    if (ISIN.includes(value)) {
      return setError("same");
    }
    setISIN([...ISIN, value]);
    subscribe(value);
    console.log("🚀 ~ file: Socket.js ~ line 73 ~ handleSubmit ~ ISIN", ISIN);
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
    <div>
      {/* <form onSubmit={handleSubmit}>
        <label>
          Enter your name:
          <input name="isin" type="text" onChange={handleValidation} />
        </label>
        <p>{error ? error : null}</p>
        <input type="submit" />
      </form> */}
      US0004026250
      <button onClick={() => setPause(!isPaused)}>
        {isPaused ? "Resume" : "Pause"}
      </button>
      US0378330015
      {/* <Table data={data} isinArr={ISIN} /> */}
    </div>
  );
};

export const openSocket = (ws) => {
  ws.current.onopen = () => {
    console.log("ws opened");
  };
};

export const subscribe = (isin) => {
  const ws = new WebSocket("ws://159.89.15.214:8080/");
  const msg = {
    subscribe: isin,
  };

  ws.onopen = () => {
    console.log("ws opened");
    ws.send(JSON.stringify(msg));
  };

  ws.onclose = function (event) {
    if (event.wasClean) {
      console.log(
        `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
      );
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      console.log("[close] Connection died");
    }
  };

  ws.onerror = function (error) {
    console.log(`[error] ${error.message}`);
  };

  return ws;
};

export const unsubscribe = (isin, ws) => {
  const msg = {
    unsubscribe: isin,
  };
  ws.send(JSON.stringify(msg));
  console.log("[close] Connection unsubscribed");
}

export default Socket;
