import React from "react";

const PageSelectSize = ({
  total,
  onChange,
  pageSizeOptions = [20, 50, 100, 150, 200]
}) => {
  return (
    <label name="PageSizeSelect">
      <span className="font-semibold mr-2 text-sm">Total {total},</span>
      <select
        className="form-control input-sm border shadow-inner bg-gray-100"
        onChange={onChange}
      >
        {pageSizeOptions.map((value, key) => (
          <option key={key} value={value}>
            {value}
          </option>
        ))}
      </select>
      <span className="text-sm ml-2">items / page</span>
    </label>
  );
};

export default PageSelectSize;
