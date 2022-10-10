const Socket = () => {
  return <></>;
};

export const subscribe = (isin) => {
  const ws = new WebSocket("ws://159.89.15.214:8080/");
  const msg = {
    subscribe: isin,
  };

  ws.onopen = () => {
    console.log(`[Open] Connection Opened ${isin}`);
    ws.send(JSON.stringify(msg));
  };

  ws.onmessage = function (event) {
    const data = JSON.parse(event.data);
    console.log(data, "data");
    return ws;
  };

  ws.onclose = function (event) {
    alert(
      "Prices are out of Sync.App is trying to reconnect. If price doesn't change, Please reload page"
    );
    console.log(
      "Socket is closed. Reconnect will be attempted in 5 seconds",
      event.reason
    );
    console.log("🚀 ~ file: Socket.js ~ line 26 ~ isin", isin);
    setTimeout(function () {
      subscribe(isin);
    }, 5000);
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
