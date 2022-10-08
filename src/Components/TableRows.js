function TableRows({ rowsData, deleteTableRows }) {
  return rowsData.map((data, index) => {
    const { isin, price, bid, ask } = data;
    return (
      <tr key={index}>
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
            onClick={() => deleteTableRows(index)}
          >
            x
          </button>
        </td>
      </tr>
    );
  });
}
export default TableRows;
