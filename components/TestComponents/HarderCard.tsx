import React, { useEffect, useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import Input from "./Input";

interface Answer {
  data: string[];
  subject: string;
}

interface IProps {
  itemName: string;
  answerArray: Answer[];
  setAnswerArray: any;
  handleSubmit: (answer: Answer) => void;
}

const HarderCard = ({ itemName, answerArray, setAnswerArray, handleSubmit }: IProps) => {
  const [totalInputs, setTotalInputs] = useState(1);
  const [firstInputValue, setFirstInputValue] = useState("");
  const [inputList, setInputList]: [JSX.Element[], any] = useState([]);

  const handleAdd = () => {
    const new_total_inputs = totalInputs + 1;
    const new_input = <Input key={new_total_inputs} id={new_total_inputs.toString()} />;
    setInputList([...inputList, new_input]);
    setTotalInputs(new_total_inputs);
  };

  const handleNext = () => {
    let dataArray = [];

    for (let index = 1; index <= totalInputs; index++) {
      dataArray.push(document.getElementById(`input_${index}`)?.getAttribute("value"));
    }

    const answer: any = { data: dataArray.filter((element) => element), subject: itemName };

    setAnswerArray([...answerArray, answer]);

    clear();
    document.getElementById(`input_${totalInputs}`)?.focus();
    handleSubmit(answer);
  };

  useEffect(() => {
    document.getElementById(`input_${totalInputs}`)?.focus();
  }, [totalInputs]);

  const clear = () => {
    setTotalInputs(1);
    setFirstInputValue("");
    setInputList([]);
  };

  return (
    <div className="bg-white shadow-lg min-h-[15vh] py-3 px-4 rounded-lg flex flex-col gap-5">
      <div className="flex items-center text-lg font-semibold">
        <h2 className="text-primary text-2xl">{itemName}</h2>
      </div>

      <div className="flex flex-col gap-[0.5rem]">
        <input
          autoFocus={true}
          autoComplete="off"
          id={`input_1`}
          value={firstInputValue}
          className={`border-[1px] border-[#0000004c] shadow-inner outline-none rounded-lg font-medium px-3 py-[5px] `}
          placeholder="Write statement here..."
          onChange={(e) => {
            setFirstInputValue(e.target.value);
          }}
        />
        {inputList}
        <button
          className="ml-2 w-min outline-none focus:outline-[#61a7e0] rounded-full"
          onClick={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >
          <div className="w-min text-[23px] hover:bg-gray-200 rounded-full">
            <GrAddCircle />
          </div>
        </button>
      </div>

      <div className="flex flex-row-reverse">
        <button
          className="focus:outline-[#61a7e0] my-[4px] bg-primary text-white font-semibold text-xl rounded-lg w-[40%] py-[2px] outline-none"
          onClick={(e) => {
            e.preventDefault();
            handleNext();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HarderCard;
