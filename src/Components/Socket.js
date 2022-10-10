const Socket = () => {
  return <></>;
};

export const subscribe = (isin) => {
  const ws = new WebSocket("ws://159.89.15.214:8080/");
  if (Array.isArray(isin)) {
    reconnect(isin, ws);
  }
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

export const reconnect = (isin, ws) => {
  isin.map((reconnectIsin) => {
    const newMsg = {
      subscribe: reconnectIsin,
    };
    ws.send(JSON.stringify(newMsg));
    console.log(`[Reconnect] Connection Reconnected ${reconnectIsin}`);
    return () => {};
  });
};

export default Socket;
