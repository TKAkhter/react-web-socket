import { useState, useEffect } from "react";
import TableRows from "./TableRows";
const Table = ({ wsArr, isinArr, unsubscribe, setIsinArr }) => {
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

  const deleteTableRows = (index,isin, ws) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
    unsubscribe(isin, ws);
    const arr = isinArr
    const idx = arr.indexOf(isin);
    if (idx > -1) { // only splice array when item is found
      arr.splice(idx, 1); // 2nd parameter means remove one item only
    }
    setIsinArr(arr);
    console.log(isinArr,'isinArr');
  };




  useEffect(() => {
    // wsArr.map((ws, index) => {
    //   console.log(index, "index");
    //   ws.onmessage = function (event) {
    //     const wsObj = JSON.parse(event.data);
    //     // const id = wsObj.isin;
    //     console.log(JSON.parse(event.data));
    //     //
    //     // console.log(index);
    //     setRowsData(wsObj);
    //   };
    // });
    isinArr.map((isin, idx) => {
      console.log(idx, "index");
      const rowsInput = {
        isin: isin,
        price: "100",
        bid: "",
        ask: "",
        ws: wsArr[idx]
      };
      return setRowsData([...rowsData, rowsInput]);

    });
  }, [wsArr,isinArr]);

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
                  <th>ISIN</th>
                  <th>Price</th>
                  <th>Bid</th>
                  <th>Ask</th>
                  <th>Status
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
