import { useState, useEffect } from "react";
import TableRows from "../TableRows";
import './Table.css';

const Table = ({ wsArr, isinArr, unsubscribe, setIsinArr }) => {
  const [rowsData, setRowsData] = useState([]);
  const [isPaused, setPause] = useState(false);

  const deleteTableRows = (index, isin, ws) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
    unsubscribe(isin, ws);
    // setIsinArr(isinArr.filter(item => item !== isin));
    console.log(index, "index");
    console.log(isin, "isin");
    console.log(isinArr, "isinArr");
    console.log(ws, "ws");

  };

  useEffect(() => {
    isinArr.map((isin, idx) => {
      const rowsInput = {
        isin: isin,
        price: "",
        bid: "",
        ask: "",
        ws: wsArr[idx],
      };
      setRowsData([...rowsData, rowsInput]);
      return () => {}
    });
  }, [wsArr, isinArr]);

  return (
    <div className="table-section">
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <h2>ISIN WatchList</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>ISIN</th>
                  <th>Price</th>
                  <th>Bid</th>
                  <th>Ask</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <TableRows
                  rowsData={rowsData}
                  deleteTableRows={deleteTableRows}
                />
              </tbody>
            </table>
          </div>
          <div className="col-sm-4">
            US0004026250
            <button onClick={() => setPause(!isPaused)}>
              {isPaused ? "Resume" : "Pause"}
            </button>
            US0378330015
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
