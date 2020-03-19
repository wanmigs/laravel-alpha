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

    if (e.target.type !== "checkbox" && e.target.tagName == "TD") {
      history.push(`${link}/${id}`);
    }
  };

  const handleActivation = async (evt, id) => {
    await axios.post(`/api/user-activation/${id}`, {
      isChecked: evt.target.checked
    });
  };

  return (
    <tbody>
      {data.map((row, i) => (
        <tr
          key={i}
          className="cursor-pointer border-b bg-white"
          onClick={e => handleClick(row.id, e)}
        >
          <td
            className={`${
              length > 1 ? "bg-blue-100" : "bg-white"
            } p-4 sticky left-0`}
          >
            <span className="flex items-baseline">
              <Checkbox
                className="mr-3"
                checked={selected.indexOf(row.id) !== -1}
                shape="curve"
                onChange={() => onSelect(row.id)}
                color="success-o"
              />
              <span className="font-semibold text-sm">{row.email}</span>
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableContent;
