import { useState, useEffect } from "react";
import TableRows from "./TableRows";
const Table = ({ wsArr, isinArr }) => {
  const [rowsData, setRowsData] = useState([]);
  const addTableRows = () => {
    const rowsInput = {
      isin: "",
      price: "",
      bid: "",
      ask: "",
    };
    setRowsData([...rowsData, rowsInput]);
  };

  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  useEffect(() => {
    wsArr.map((ws, index) => {
      console.log(index, "index");
      ws.onmessage = function (event) {
        const wsObj = JSON.parse(event.data);
        // const id = wsObj.isin;
        console.log(JSON.parse(event.data));
        //
        // console.log(index);
        setRowsData(wsObj);
      };
    });
  }, [wsArr]);

  //   console.log(wsArr, "ws");
  //   console.log(isinArr, "isinArr");
  //   console.log(rowsData, "rowsData");

  return (
    <div className="table-section">
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <h2>ISIN WatchList</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>isin</th>
                  <th>price</th>
                  <th>bid</th>
                  <th>ask</th>
                  <th>
                    <button
                      className="btn btn-outline-success"
                      onClick={addTableRows}
                    >
                      +
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <TableRows
                  rowsData={rowsData}
                  deleteTableRows={deleteTableRows}
                />
                {/* {isinArr.map((isin, idx) => {
                return (
                  <tr key={idx} className={isin}>
                    {Object.keys(rowsData).map((item) => {
                      if (rowsData.isin === isin) {
                        return (
                          <td key={item}>
                            {item === "isin"
                              ? rowsData[item]
                              : parseFloat(rowsData[item]).toFixed(3)}
                          </td>
                        );
                      }
                    })}
                  </tr>
                );
              })} */}
                {/* <tr>
                {rowsData.map((item) => {
                    console.log(rowsData[item]);
                  return (
                    <td key={item}>
                      {item === "isin"
                        ? rowsData[item]
                        : parseFloat(rowsData[item]).toFixed(3)}
                    </td>
                  );
                })}
              </tr> */}
              </tbody>
            </table>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Table;
