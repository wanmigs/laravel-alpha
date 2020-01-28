import React, { useRef, useState } from "react";
import Text from "./form/Text";
import Select from "./form/Select";
import Label from "./Label";

const components = {
  text: Text,
  select: Select
};

const Form = ({
  errors,
  formFields,
  data = {},
  disabled = ``,
  divColClass = null,
  labelClass = null,
  action = null,
  ...rest
}) => {
  const Field = key => {
    let type = formFields[key].type || "text";
    let Field = components[type] || components["text"];

    return (
      <>
        <Field form={formFields[key]} keyIndex={key} data={data} />
        {errors[key] && (
          <span className="text-red-500 italic text-sm">{errors[key][0]}</span>
        )}
      </>
    );
  };

  return Object.keys(formFields).map((value, key) => (
    <div
      className={
        divColClass ? `${divColClass}` : `items-start lg:flex mb-4 lg:mb-5`
      }
      key={key}
    >
      <Label className={labelClass ? `${labelClass}` : `lg:w-48 capitalize`}>
        {formFields[value].label || value.replace("_", " ")}
      </Label>
      <span className={`w-full max-w-sm`}>{Field(value)}</span>
    </div>
  ));
};

export default Form;
