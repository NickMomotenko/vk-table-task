const Table = () => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {/* {headers.map(h => (
              <th key={h} className="border p-2 text-left bg-gray-100">{h}</th>
            ))} */}
            <th>Head 1</th>
            <th>Head 1</th>
            <th>Head 1</th>
            <th>Head 1</th>
            <th>Head 1</th>
          </tr>
        </thead>
        <tbody>
          {/* {allRows.map((rec, i) => (
            <tr key={i}>
              {headers.map(h => (
                <td key={h} className="border p-2">{rec[h]}</td>
              ))}
            </tr>
          ))} */}
           <tr>
            <th>body 1</th>
            <th>body 1</th>
            <th>body 1</th>
            <th>body 1</th>
            <th>body 1</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
