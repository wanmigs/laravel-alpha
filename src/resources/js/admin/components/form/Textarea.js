import React from 'react'

const Textarea = ({ form, keyIndex, data = {} }) => {
  return (
    <textarea
      name={keyIndex}
      className={`border bg-white border-gray-400 focus:border-primary appearance-none rounded-lg px-3 py-2 outline-none w-full`}
      defaultValue={form.value || data[keyIndex] || ``}
      onChange={form.onChange}
      rows={form.rows || 5}
      placeholder={
        typeof form.placeholder !== "undefined" ? form.placeholder : ""
      }
    />
  );
};

export default Textarea
