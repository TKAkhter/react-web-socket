const Socket = () => {
  return <></>;
};

export const subscribe = (isin, wsArr) => {
  const ws = new WebSocket("ws://159.89.15.214:8080/");

  const msg = {
    subscribe: isin,
  };
  console.log("🚀 ~ file: Socket.js ~ line 11 ~ subscribe ~ isin", isin);

  ws.onopen = () => {
    console.log(ws.readyState, "ws.readyState");
    console.log(`[Open] Connection Opened ${isin}`);
    ws.send(JSON.stringify(msg));
  };

  ws.onerror = function (error) {
    console.log(`[error] ${error.message}`);
    ws.close();
  };

  return ws;
};

export const unsubscribe = (isin, ws) => {
  const msg = {
    unsubscribe: isin,
  };
  ws.send(JSON.stringify(msg));
  console.log(`[Close] Connection unsubscribed ${isin}`);
};

export default Socket;
