import { useState } from "react";
import TableRows from "./TableRows";
const Table = ({ data }) => {
  const [rowsData, setRowsData] = useState([]);
  const addTableRows = () => {
    const rowsInput = {
      isin: data.isin,
      price: data.price,
      bid: data.bid,
      ask: data.ask,
    };
    setRowsData([...rowsData, rowsInput]);
  };

  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8">
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
              {/* <TableRows
                rowsData={rowsData}
                deleteTableRows={deleteTableRows}
              /> */}
              <tr>
                {Object.keys(data).map((item) => {
                  return <td key={item}>{ item == 'isin' ? data[item] : parseFloat(data[item]).toFixed(3)}</td>;
                })}
              </tr>
              
            </tbody>
          </table>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </div>
  );
};
export default Table;
