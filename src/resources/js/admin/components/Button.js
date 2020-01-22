import React from "react";

const Button = ({ onClick, children, className = "", ...rest }) => (
  <button
    className={`${className} mr-2 px-4 py-2 outline-none rounded-lg shadow text-xs tracking-wider uppercase`}
    onClick={onClick}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
