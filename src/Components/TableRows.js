import { useState } from "react";

function TableRows({ rowsData, deleteTableRows, status }) {
  const [row, setRow] = useState([
    {
      isin: "",
      price: "",
      bid: "",
      ask: "",
    },
  ]);
  if (rowsData.length === 0) return;

  const deleteTableData = (index, row, setRow) => {
    let rowUpdate = row;
    delete rowUpdate[index];
    setRow(row);
  };

  return rowsData.map((data, index) => {
    const { isin, ws } = data;

    ws.onmessage = function (event) {
      const data = JSON.parse(event.data);
      if (data.isin === isin) {
        setRow({
          ...row,
          [index]: JSON.parse(event.data),
        });
      }
      console.log(row, "row");
    };

    return (
      <tr key={index} className={isin}>
        <td>
          <p>{isin}</p>
        </td>
        <td>
          <p>{row[index] ? parseFloat(row[index].price).toFixed(3) : ""}</p>
        </td>
        <td>
          <p>{row[index] ? parseFloat(row[index].bid).toFixed(3) : ""}</p>
        </td>
        <td>
          <p>{row[index] ? parseFloat(row[index].ask).toFixed(3) : ""}</p>
        </td>
        <td>
          <button
            className="btn btn-outline-danger inactive"
            onClick={() => {
              deleteTableRows(index, isin, ws);
              deleteTableData(index, row, setRow);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
}
export default TableRows;
