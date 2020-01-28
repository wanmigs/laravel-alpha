import React, { useState } from "react";
import { Checkbox } from "pretty-checkbox-react";

const TableHeader = ({ onSelect, checked, columns = {} }) => {
  let length = Object.keys(columns).length;

  return (
    <thead>
      <tr className="table-head-row">
        {Object.keys(columns).map((data, index) => {
          let width = "";

          if (data.includes("width")) {
            width = data.match(/(?<=width=)(\w+)(?=,)?/g)[0];
          }

          if (index === 0) {
            return (
              <th
                className={`${
                  length > 1 ? "bg-blue-100" : "bg-gray-100"
                } border-b px-4 py-3 text-sm  sticky left-0`}
                key={index}
                style={{ width }}
              >
                <span className="flex items-center">
                  <Checkbox
                    checked={checked}
                    className={`text-base mr-3`}
                    onChange={() => onSelect()}
                    shape="curve"
                    color="success-o"
                  ></Checkbox>
                  {columns[data].label.replace(/:.*/g, "")}
                </span>
              </th>
            );
          }
          return (
            <th
              key={index}
              className="border-b bg-gray-100 px-4 py-3 text-sm"
              style={width ? { width: `${width}px` } : {}}
            >
              {columns[data].label.replace(/:.*/g, "")}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default React.memo(TableHeader);
