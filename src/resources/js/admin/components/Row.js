import React from "react";
import { useHistory } from "react-router-dom";
import { Checkbox } from "pretty-checkbox-react";

const TableContent = ({
  data,
  onSelect,
  columns = {},
  selected,
  link = ""
}) => {
  let length = Object.keys(columns).length;
  const history = useHistory();

  const handleClick = (id, e) => {
    e.persist();
    if (e.target.type !== "checkbox") {
      history.push(`${link}/${id}`);
    }
  };

  return (
    <tbody>
      {data.map((row, i) => (
        <tr
          key={i}
          className="cursor-pointer border-b bg-white"
          onClick={e => handleClick(row.id, e)}
        >
          {Object.keys(columns).map((data, index) => {
            if (index === 0) {
              return (
                <td
                  className={`${
                    length > 1 ? "bg-blue-100" : "bg-white"
                  } p-4 sticky left-0`}
                  key={index}
                >
                  <span className="flex items-baseline">
                    <Checkbox
                      className="mr-3"
                      checked={selected.indexOf(row.id) !== -1}
                      shape="curve"
                      onChange={() => onSelect(row.id)}
                      color="success-o"
                    ></Checkbox>
                    <span className="font-semibold text-sm">{row[data]}</span>
                  </span>
                </td>
              );
            }
            return (
              <td key={index} className="text-sm p-4">
                {row[data] ? row[data] : "-"}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableContent;
