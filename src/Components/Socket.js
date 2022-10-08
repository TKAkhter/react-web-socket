import { useState, useEffect, useRef } from "react";
import Table from "./Table";

const Socket = () => {
  const [isPaused, setPause] = useState(false);
  const [ISIN, setISIN] = useState("");
  const [data, setdata] = useState({});
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://159.89.15.214:8080/");
    openSocket();
    return () => {
      closeSocket();
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;
    getDataSocket();
  }, [isPaused]);

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
  };

  const subscribe = (isin) => {
    const msg = {
      subscribe: isin,
    };
    console.log("🚀 ~ file: Socket.js ~ line 50 ~ subscribe ~ isin", isin);
    ws.current.send(JSON.stringify(msg));
  };

  const unsubscribe = (isin, newISIN) => {
    const msg = {
      unsubscribe: isin,
    };
    console.log("🚀 ~ file: Socket.js ~ line 58 ~ unsubscribe ~ isin", isin);
    ws.current.send(JSON.stringify(msg));
    setISIN(newISIN);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    subscribe(event.target.isin.value);
    ISIN
      ? unsubscribe(ISIN, event.target.isin.value)
      : setISIN(event.target.isin.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your name:
          <input name="isin" type="text" />
        </label>
        <input type="submit" />
      </form>
      <button onClick={() => setPause(!isPaused)}>
        {isPaused ? "Resume" : "Pause"}
      </button>
      <Table data={data} />
    </div>
  );
};

export default Socket;
