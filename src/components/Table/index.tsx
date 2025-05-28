import './styles.scss'

const Table = ({ data }) => {
  let headers = data.length ? Object.keys(data[0]) : [];

  return (
    <div>
      <table className="table">
        <thead className="table__head">
          <tr className="table__row">
            {headers.map((header, ind) => (
              <th key={ind}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className='table__body'>
          {data.map((row) => {
            let rowId = row.id;
            return (
              <tr key={rowId} className="table__row">
                {headers.map((h) => (
                  <td key={h}>{row[h]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
