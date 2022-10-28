import React from "react";

interface IProps {
  dataValue: string;
  emptyAnswer: boolean;
  answerInput: string;
  setAnswerInput: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
  hasFinished: boolean;
}

const Card = ({
  dataValue,
  emptyAnswer,
  answerInput,
  setAnswerInput,
  handleSubmit,
  hasFinished,
}: IProps) => {
  return (
    <div className="bg-white shadow-lg min-h-[15vh] py-3 px-4 rounded-lg flex flex-col gap-5">
      <div className="flex items-center text-lg font-semibold">
        <span className="text-3xl mx-3">&#8227;</span>
        <h2>{dataValue}</h2>
      </div>
      <input
        autoFocus
        autoComplete="off"
        id="answer_input"
        type="text"
        className={`border-[1px] border-[#0000004c] shadow-inner outline-none rounded-lg font-medium px-3 py-[5px] 
          ${emptyAnswer ? "border-red-400 border-[2px]" : ""}`}
        placeholder="Write item name here..."
        value={answerInput}
        onChange={(e) => {
          setAnswerInput(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />

      <div className="flex flex-row-reverse">
        <button
          disabled={hasFinished}
          className="my-[4px] bg-primary text-white font-semibold text-xl rounded-lg w-[40%] py-[2px] outline-none"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Enter
        </button>
      </div>
    </div>
  );
};

export default Card;
