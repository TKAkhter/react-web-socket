function TableRows({ rowsData, deleteTableRows }) {
//   return Object.keys(rowsData).map((data, index) => {
    const { isin, price, bid, ask } = rowsData;
    // console.log("🚀 ~ file: TableRows.js ~ line 4 ~ returnObject.keys ~ data", data);
    // console.log("🚀 ~ file: TableRows.js ~ line 4 ~ returnObject.keys ~ isin", rowsData[data]);
    return (
      <tr key={isin} className={isin}>
        <td>
          <p>{isin}</p>
        </td>
        <td>
          <p>{price}</p>
        </td>
        <td>
          <p>{bid}</p>
        </td>
        <td>
          <p>{ask}</p>
        </td>
        <td>
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteTableRows(isin)}
          >
            x
          </button>
        </td>
      </tr>
    );
//   });
}
export default TableRows;
