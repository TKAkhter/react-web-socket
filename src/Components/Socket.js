const Socket = () => {
  return (
    <></>
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
};

export default Socket;
