import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiMinusCircle } from "react-icons/fi";

import { ReactStateSetter } from "../../types";
import Data from "./Data";

interface IProps {
  idx: number;
  handleChange: (
    idx: number,
    item_subject: string,
    item_data: { _idx: number; value: string }[]
  ) => void;
}

const Item = ({ idx, handleChange }: IProps) => {
  const [totalDataCount, setTotalDataCount] = useState(1);
  const [dataCounter, setDataCounter] = useState(1);
  const [mainInput, setMainInput] = useState("");
  const [_data, set_data]: [{ _idx: number; value: string }[], ReactStateSetter] = useState([]);
  const [dataArray, setDataArray]: [JSX.Element[], any] = useState([]);

  const handleDataChange = (idx: number, data: string) => {
    let new_data = _data;

    new_data[idx] = {
      _idx: idx,
      value: data,
    };

    set_data(new_data);
  };

  const handleAddData = () => {
    setDataArray([
      ...dataArray,
      <Data
        key={totalDataCount}
        idx={totalDataCount}
        placeholder={dataCounter}
        handleDataChange={handleDataChange}
      />,
    ]);
    setTotalDataCount(totalDataCount + 1);
    setDataCounter(dataCounter + 1);
  };

  const input_style =
    "w-full mt-1 p-1 border-[1px] border-gray-400 focus:outline-primary rounded-lg";

  useEffect(() => {
    handleChange(idx, mainInput, _data);
  }, [mainInput, _data, dataArray, handleChange, idx]);

  const handleDeleteData = () => {
    set_data(_data.slice(0, -1));
    setDataArray(dataArray.slice(0, -1));
    setDataCounter(dataCounter - 1);
  };

  return (
    <div className="my-4">
      <div className="shadow-lg p-4 bg-white rounded-3xl">
        <span className="block text-lg font-bold text-primary">Item N°{idx + 1}</span>
        <input
          className={`${input_style}`}
          value={mainInput}
          placeholder="Subject"
          autoFocus
          onChange={(e) => {
            setMainInput(e.target.value);
          }}
        />
        <div className="mt-2">
          <span className="mb-1 ml-5 block font-bold text-primary">Data</span>
          <Data placeholder={0} key={0} idx={0} handleDataChange={handleDataChange} />
          {dataArray}
          <div className="mt-2 flex items-center gap-[2rem]">
            <button
              className="text-[#00000060] text-[1.6rem] ml-4 rounded-full"
              onClick={(e) => {
                e.preventDefault();
                handleAddData();
              }}
            >
              <IoMdAddCircleOutline />
            </button>
            {dataArray.length !== 0 && (
              <button
                className="rounded-full text-[1.4rem] text-red-400"
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteData();
                }}
              >
                <FiMinusCircle />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
