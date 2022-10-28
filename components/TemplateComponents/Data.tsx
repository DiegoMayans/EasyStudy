import React, { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";

interface IProps {
  idx: number;
  placeholder: number;
  handleDataChange: (idx: number, data: string) => void;
}

const Data = ({ idx, placeholder, handleDataChange }: IProps) => {
  const [dataInput, setDataInput] = useState("");

  const input_style =
    "ml-[1rem] pr-3 mt-1 w-full p-1 border-[1px] border-gray-400 focus:outline-primary rounded-lg";

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDataInput(e.target.value);
  };

  useEffect(() => {
    handleDataChange(idx, dataInput);
  }, [idx, handleDataChange, dataInput]);

  return (
    <div className="relative">
      <div className="flex items-center mb-[0.75rem]">
        <span className="top-[9px] -left-2 absolute mr-1 text-primary text-2xl">
          <BsDot />
        </span>

        <textarea
          value={dataInput}
          onChange={(e) => {
            handleChange(e);
          }}
          rows={1}
          className={`${input_style} max-w-[93%]`}
          placeholder={`${placeholder + 1}.`}
        />
      </div>
    </div>
  );
};

export default Data;
