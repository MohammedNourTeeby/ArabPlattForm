"use client"
import React, { useState } from 'react';

const InputField = ({ label, children, isRequired, name, value, onUpdate }) => {
  const [localValue, setLocalValue] = useState(value || "");

  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };

  const handleBlur = () => {
    onUpdate(name, localValue);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <label className="text-sm font-medium">
          {label}
        </label>
        {isRequired && <span className="text-danger">*</span>}
      </div>
      {React.cloneElement(children, {
        value: localValue,
        onChange: handleChange,
        onBlur: handleBlur,
      })}
    </div>
  );
};

export default InputField;