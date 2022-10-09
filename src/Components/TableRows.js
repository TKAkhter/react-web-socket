function TableRows({ rowsData, deleteTableRows }) {
  // return rowsData.map((data, index) => {
    const { isin, price, bid, ask } = rowsData;
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
  // });
}
export default TableRows;
