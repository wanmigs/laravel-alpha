import React from "react";
import TextInput from "../TextInput";

const Text = ({ form, keyIndex, data = {} }) => {
  return (
    <>
      <TextInput
        type={form.type || `text`}
        className={`w-full`}
        name={keyIndex}
        value={form.value || data[keyIndex] || ``}
        onChange={form.onChange}
        placeholder={
          typeof form.placeholder !== "undefined" ? form.placeholder : ""
        }
      />
    </>
  );
};

export default Text;
