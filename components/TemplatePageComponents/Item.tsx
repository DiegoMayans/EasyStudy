import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

import styles from "../../styles/Item.module.css";

interface IProps {
  data: { value: string; _idx: number }[];
  subject: string;
  _idx: number;
}

const Item = ({ data, subject }: IProps) => {
  const [dataHidden, setDataHidden] = useState(true);
  let itemArr: JSX.Element[] = [];

  data.forEach((data, i) => {
    const x = (
      <span key={i} className="block pb-3">
        {data._idx + 1}. &nbsp;{data.value}
      </span>
    );

    itemArr = [...itemArr, x];
  });

  return (
    <div className={`border-b-[1px] py-[8.5px] flex  flex-col ${styles.item}`}>
      <div
        className={`flex items-center cursor-pointer justify-between`}
        onClick={() => {
          setDataHidden(!dataHidden);
        }}
      >
        <span className="font-semibold pb-2">{subject}</span>
        <div className={`ml-5 text-2xl`}>
          {dataHidden ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />}
        </div>
      </div>

      <div
        className={`${
          dataHidden ? "hidden" : ""
        } p-3 border-t-2 border-primary rounded-md bg-gray-50 w-full h-min`}
      >
        <div className="text-base font-semibold">{itemArr}</div>
      </div>
    </div>
  );
};

export default Item;
