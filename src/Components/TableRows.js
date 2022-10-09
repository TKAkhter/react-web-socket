import { useState, useEffect } from "react";

function TableRows({ rowsData, deleteTableRows }) {
  const [row, setRow] = useState([
    {
      isin: "",
      price: "100",
      bid: "",
      ask: "",
    },
  ]);
  if (rowsData.length === 0) return;

  return rowsData.map((data, index) => {
    const { isin, price, bid, ask, ws } = data;

    ws.onmessage = function (event) {
      const data = JSON.parse(event.data);
      if (data.isin === isin) {
        setRow({
          ...row,
          [index]: JSON.parse(event.data),
        });
      }
      // console.log(JSON.parse(event.data),index);
      console.log(row, "row");
    };

    return (
      <tr key={index} className={isin}>
        <td>
          <p>{isin}</p>
        </td>
        <td>
          <p>{row[index] ? parseFloat(row[index].price).toFixed(3) : ''}</p>
        </td>
        <td>
          <p>{row[index] ? parseFloat(row[index].bid).toFixed(3) : ''}</p>
        </td>
        <td>
          <p>{row[index] ? parseFloat(row[index].ask).toFixed(3) : ''}</p>
        </td>
        <td>
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteTableRows(index, isin, ws)}
          >
            x
          </button>
        </td>
      </tr>
    );
  });
}
export default TableRows;
