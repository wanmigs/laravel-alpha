import React from "react";

const Label = ({ children, className = `` }) => (
  <label
    className={`block mb-2 font-semibold text-blue-800 tracking-wide ${className}`}
  >
    {children}
  </label>
);

export default Label;
