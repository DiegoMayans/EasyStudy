import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoReloadOutline } from "react-icons/io5";
import { FiMoreHorizontal } from "react-icons/fi";
import { useRouter } from "next/router";

import { ITemplate } from "../../../../types";
import { BASE_URL } from "../../../../utils";
import Card from "../../../../components/TestComponents/Card";

const Test = ({ data }: { data: ITemplate }) => {
  const router = useRouter();

  const btn_style = `text-lg border-2 px-3 py-1 rounded-md text-gray-600 font-medium`;

  const items = data.items;

  // Declare Data Array
  let dataArr: { value: string; belongsTo?: string; _idx: number }[] = [];

  // Populating Data Array
  items.forEach((item, i) => {
    item.data.forEach((data, j) => {
      dataArr.push(data);
    });
  });

  const totalQuestions = dataArr.length;
  const [hasFinished, setHasFinished] = useState(false);

  const i_index = Math.floor(Math.random() * dataArr.length);
  const [randIndex, setRandIndex] = useState(i_index);

  const [currentDataArr, setCurrentDataArr] = useState(dataArr);
  const [currentData, setCurrentData] = useState(currentDataArr[randIndex]);
  const [qIndex, setQIndex] = useState(0);
  const [answerInput, setAnswerInput] = useState("");
  const [validAnswers, setValidAnswers] = useState(0);

  const [emptyAnswer, setEmptyAnswer] = useState(false);

  // Handle user's answer
  const handleSubmit = () => {
    if (!answerInput) {
      setEmptyAnswer(true);
      document.getElementById("answer_input")?.focus();
      return;
    }

    setAnswerInput("");
    document.getElementById("answer_input")?.focus();

    setQIndex(qIndex + 1);
    if (answerInput.trim().toLowerCase() === currentData.belongsTo?.trim().toLowerCase()) {
      setValidAnswers(validAnswers + 1);
    }

    const newDataArr = currentDataArr.filter((e, i) => i !== randIndex);
    const newRandIdx = Math.floor(Math.random() * newDataArr.length);

    setCurrentDataArr(newDataArr);

    setRandIndex(newRandIdx);

    setCurrentData(newDataArr[newRandIdx]);
  };

  // Effect to detect and handle blank inputs and finished test
  useEffect(() => {
    if (emptyAnswer) {
      if (answerInput) {
        setEmptyAnswer(false);
      }
    }
    if (qIndex === totalQuestions) {
      setHasFinished(true);
    }
  }, [emptyAnswer, answerInput, qIndex, setHasFinished, totalQuestions]);

  // Function to reset the test
  const cleanTest = () => {
    const new_index = Math.floor(Math.random() * dataArr.length);
    setCurrentDataArr(dataArr);
    setCurrentData(dataArr[new_index]);
    setQIndex(0);
    setValidAnswers(0);
    setHasFinished(false);
  };

  const handleRetry = () => {
    cleanTest();
  };

  return (
    <div className="min-h-[80vh] py-[2rem]">
      <div className="flex flex-col items-center justify-center gap-[3rem]">
        <div className="flex w-[91%] items-center justify-between">
          <div className="ml-[1rem] font-bold text-[#00000088]">
            {hasFinished ? null : <h3>Question {qIndex + 1}</h3>}
          </div>
          <div className="mr-[1rem] text-2xl">
            <button className="hover:bg-gray-200 rounded-full px-[3px] py-[2px]">
              <FiMoreHorizontal />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-[2rem] w-[91%]">
          {!hasFinished ? (
            <h2 className="text-xl block text-center">Write the item this statement refers to:</h2>
          ) : (
            <>
              <h1 className="text-2xl block text-center text-primary font-semibold">
                You&apos;ve finished the test!
              </h1>
              <h2 className="text-gray-500 font-medium text-center">
                If this felt easy, you should try a harder version.
              </h2>
            </>
          )}

          {hasFinished && (
            <div className="flex justify-center gap-[4rem] w-[100%] my-[2rem]">
              <button
                className={`${btn_style} border-gray-400 hover:bg-[#00000010]`}
                onClick={(e) => {
                  e.preventDefault();
                  handleRetry();
                }}
              >
                <div className="flex gap-2 items-center">
                  <span>Retry</span>
                  <IoReloadOutline />
                </div>
              </button>
              <button
                className={`${btn_style} hover:bg-red-50 border-red-300 text-[#ff0000af]`}
                onClick={(e) => {
                  e.preventDefault();
                  cleanTest();
                  const new_url = `/template/${router.query.pid}/${router.query.tid}/test-2`;
                  router.push(new_url);
                }}
              >
                Try Harder
              </button>
            </div>
          )}

          {currentData && (
            <Card
              dataValue={currentData.value}
              emptyAnswer={emptyAnswer}
              answerInput={answerInput}
              setAnswerInput={setAnswerInput}
              handleSubmit={handleSubmit}
              hasFinished={hasFinished}
            />
          )}

          <div className="flex justify-between">
            <div className="ml-[2rem] text-green font-semibold">
              <h3>Correct Answers: {validAnswers}</h3>
            </div>
            <div className="mr-[3rem] font-semibold">
              <h3>Total: {qIndex}</h3>
            </div>
          </div>
          <div className="flex justify-center items-center font-bold">
            <h4>Accuracy: {qIndex == 0 ? "0" : Math.floor((validAnswers / qIndex) * 100)}%</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { pid, tid },
}: {
  params: { pid: string; tid: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/template/${pid}/${tid}`);

  return {
    props: { data: res.data },
  };
};

export default Test;
