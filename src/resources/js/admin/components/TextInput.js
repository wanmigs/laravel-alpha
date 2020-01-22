import React from "react";

function TextInput({
  value,
  onChange,
  className = ``,
  disabled = ``,
  ...rest
}) {
  return (
    <input
      className={`border bg-white border-gray-400 focus:border-primary appearance-none rounded-lg px-3 py-2 outline-none ${className}`}
      defaultValue={value}
      onChange={onChange}
      disabled={disabled ? "disabled" : ""}
      {...rest}
    />
  );
}

export default TextInput;
