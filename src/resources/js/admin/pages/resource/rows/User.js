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
          {Object.keys(columns).map((data, index) => {
            if (!data || data.includes(":")) {
              return null;
            }

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
          <td className="flex p-4 w-full">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="hidden"
                  defaultChecked={row.deactivated_at ? true : false}
                  onClick={evt => handleActivation(evt, row.id)}
                />
                <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                <div className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
              </div>
            </label>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableContent;
