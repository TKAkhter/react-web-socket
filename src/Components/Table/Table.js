import { useState, useEffect } from "react";
import TableRows from "../TableRows";
import "./Table.css";

const Table = ({ ws, isinArr, unsubscribe, setIsinArr }) => {
  const [rowsData, setRowsData] = useState([]);

  const deleteTableRows = (index, isin, ws) => {
    const newIsinArr = isinArr.filter((item) => item !== isin);
    console.log("🚀 ~ file: Table.js ~ line 10 ~ deleteTableRows ~ newIsinArr", newIsinArr);
    setIsinArr(newIsinArr);
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
    unsubscribe(isin, ws);
    
  };

  useEffect(() => {
    isinArr.map((isin) => {
      const rowsInput = {
        isin: isin,
        price: "",
        bid: "",
        ask: "",
        ws:ws
      };
      setRowsData([...rowsData, rowsInput]);
      return () => {};
    });
  }, [ws]);

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
        </div>
      </div>
    </div>
  );
};

export default Table;
