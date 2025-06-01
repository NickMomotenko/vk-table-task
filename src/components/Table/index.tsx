import type { User } from "../../helpers/types";

import "./styles.scss";

type TableProps = {
  data?: User[] | [];
};

const Table: React.FC<TableProps> = ({ data }) => {
  let headers: string[] | [] = data?.length ? Object.keys(data[0]) : [];

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
        <tbody className="table__body">
          {data?.map((row: any) => {
            let rowId = row.id;
            return (
              <tr key={rowId} className="table__row">
                {headers.map((h: string) => (
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
