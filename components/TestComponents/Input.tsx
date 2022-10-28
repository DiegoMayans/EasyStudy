import React, { useState } from "react";

interface IProps {
  autoFocus?: boolean;
  id: string;
}

const Input = ({ autoFocus, id }: IProps) => {
  const [value, setValue] = useState("");

  return (
    <input
      autoFocus={autoFocus}
      autoComplete="off"
      id={`input_${id}`}
      value={value}
      className={`border-[1px] border-[#0000004c] shadow-inner outline-none rounded-lg font-medium px-3 py-[5px] `}
      placeholder="Write statement here..."
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export default Input;
