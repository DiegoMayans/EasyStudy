import React from "react";

interface IProps {
  message: string;
}

const InputError = ({ message }: IProps) => {
  return <div className="text-red-500 text-xs text-left mt-2">{message}</div>;
};

export default InputError;
