import styles from "../styles/CustomTitle.module.css";
import React, { useState } from "react";

interface IProps {
  children: React.ReactNode;
  title: string;
  adjust?: { bottom?: string; top?: string; left?: string; right?: string };
}

const CustomTitle = ({ children, title, adjust }: IProps) => {
  const [showTitle, setShowTitle] = useState(false);

  let titlePos = {
    bottom: "120%",
    top: "",
    left: "90%",
    right: "",
  };
  if (adjust) {
    const { bottom, top, left, right } = adjust;
    if (bottom) titlePos = { ...titlePos, bottom };
    if (top) titlePos = { ...titlePos, top };
    if (right) titlePos = { ...titlePos, right };
    if (left) titlePos = { ...titlePos, left };
  }

  const titleStyle = `rounded-sm bg-[#00000045] absolute -bottom-[${titlePos.bottom}] 
    -left-[${titlePos.left}] right-[${titlePos.right}] top-[${titlePos.top}] text-white p-[4px] w-max text-sm font-semibold`;

  return (
    <div className="relative w-min h-min">
      <div
        className="flex"
        onMouseEnter={() => {
          setShowTitle(true);
        }}
        onMouseLeave={() => {
          setShowTitle(false);
        }}
      >
        {children}
      </div>

      {showTitle && <span className={`${styles.customTitle} ${titleStyle}`}>{title}</span>}
    </div>
  );
};

export default CustomTitle;
