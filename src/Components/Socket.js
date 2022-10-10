const Socket = () => {
  return <></>;
};

export const initialize = (isin) => {
  const ws = new WebSocket("ws://159.89.15.214:8080/");
  return subscribe(isin, ws);
};

export const subscribe = (isin, ws) => {
  const msg = {
    subscribe: isin,
  };

  ws.onopen = () => {
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
