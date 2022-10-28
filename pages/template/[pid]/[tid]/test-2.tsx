import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoReloadOutline } from "react-icons/io5";
import { FiMoreHorizontal } from "react-icons/fi";

import { ITemplate } from "../../../../types";
import { BASE_URL } from "../../../../utils";
import HarderCard from "../../../../components/TestComponents/HarderCard";
import TestItem from "../../../../components/TestComponents/TestItem";

interface Answer {
  data: string[];
  subject: string;
}

const Test = ({ data }: { data: ITemplate }) => {
  const btn_style = `text-lg border-2 px-3 py-1 rounded-md text-gray-600 font-medium`;

  const items = data.items;

  const [answerTable, setAnswerTable]: [JSX.Element[], any] = useState([]);
  const [hasFinished, setHasFinished] = useState(false);

  const i_index = Math.floor(Math.random() * items.length);
  const [randIndex, setRandIndex] = useState(i_index);
  const [currentItemArr, setCurrentItemArr] = useState(items);
  const [currentItem, setCurrentItem] = useState(items[randIndex]);
  const [qIndex, setQIndex] = useState(0);
  const [answerArray, setAnswerArray]: [{ data: string[]; subject: string }[], any] = useState([]);

  // Handle user's answer
  const handleSubmit = (answer: Answer) => {
    setQIndex(qIndex + 1);

    let new_item = (
      <TestItem data={currentItem.data} subject={currentItem.subject} answers={answer.data} />
    );

    setAnswerTable([...answerTable, new_item]);

    const new_arr = currentItemArr.filter((element) => element.subject !== currentItem.subject);
    setCurrentItemArr(new_arr);

    const new_rand_idx = Math.floor(Math.random() * new_arr.length);
    setRandIndex(new_rand_idx);

    setCurrentItem(new_arr[new_rand_idx]);
  };

  // Effect to detect and handle blank inputs and finished test
  useEffect(() => {
    if (!currentItemArr.length) setHasFinished(true);
  }, [currentItemArr]);

  // Function to reset the test
  const cleanTest = () => {
    const new_rand_idx = Math.floor(Math.random() * items.length);
    setHasFinished(false);
    setRandIndex(new_rand_idx);
    setCurrentItemArr(items);
    setCurrentItem(items[new_rand_idx]);
    setQIndex(0);
    setAnswerArray([]);
  };

  const handleRetry = () => {
    cleanTest();
  };

  return (
    <div className="min-h-[80vh] py-[2rem]">
      <div className="flex flex-col items-center justify-center gap-[3rem]">
        <div className="flex w-[91%] items-center justify-between">
          <div className="ml-[1rem] font-bold text-[#00000088]">
            {!hasFinished && <h3>Question {qIndex + 1}</h3>}
          </div>
          <div className="mr-[1rem] text-2xl">
            <button className="hover:bg-gray-200 rounded-full px-[3px] py-[2px]">
              <FiMoreHorizontal />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-[2rem] w-[91%]">
          {!hasFinished ? (
            <h2 className="text-xl block text-center">
              List all statements that belong to the next item:
            </h2>
          ) : (
            <>
              <h1 className="text-2xl block text-center text-primary font-semibold">
                You&apos;ve finished the test!
              </h1>
              <h2 className="text-gray-500 font-medium text-center">
                Check your answers and repeat...
              </h2>
            </>
          )}

          {hasFinished && (
            <>
              <div className="flex justify-center gap-[4rem] w-[100%] my-[2rem]">
                <button
                  className={`${btn_style} border-primary hover:bg-[#00000010]`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleRetry();
                  }}
                >
                  <div className="flex justify-center gap-2 items-center w-[8rem] text-xl">
                    <span>Repeat</span>
                    <IoReloadOutline />
                  </div>
                </button>
              </div>

              <div className="flex justify-center w-full">
                <div className="w-[85%]">{answerTable}</div>
              </div>
            </>
          )}

          {currentItem && (
            <>
              <HarderCard
                handleSubmit={handleSubmit}
                itemName={currentItem.subject}
                setAnswerArray={setAnswerArray}
                answerArray={answerArray}
              />
            </>
          )}
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
