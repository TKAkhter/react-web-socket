import { useState, useEffect, useRef } from "react";

const Socket = () => {
  const [isPaused, setPause] = useState(false);
  const [ISIN, setISIN] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://159.89.15.214:8080/");
    ws.current.onopen = () => {
      console.log("ws opened");
    };
    ws.current.onclose = () => console.log("ws closed");

    return () => {
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e) => {
      if (isPaused) return;
      const message = JSON.parse(e.data);
      console.log("e", message);
    };
  }, [isPaused]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(`The name you entered was: ${name}`)
    const msg = {
        subscribe: ISIN,
      };
      ws.current.send(JSON.stringify(msg));
  }
  return (
    
    <div>
     <form onSubmit={handleSubmit}>
      <label>Enter your name:
        <input 
          type="text" 
          value={ISIN}
          onChange={(e) => setISIN(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
      <button onClick={() => setPause(!isPaused)}>
        {isPaused ? "Resume" : "Pause"}
      </button>
    </div>
  );
};

export default Socket;
