import Link from "next/link";
import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";

import CustomTitle from "../CustomTitle";
import { useGlobalState } from "../GlobalStateProvider";

const TemplateCard = ({ name }: { name: string }) => {
  const [state] = useGlobalState();

  return (
    <div className="min-w-[90%] xl:min-w-[0px] xl:w-[647px] border-[2px] border-l-[3px] border-blue-400 bg-blue-200 rounded-full flex h-[60px]">
      <div className="cursor-pointer hover:bg-blue-50 border-r-[3px] border-blue-400 bg-white rounded-full min-w-[60px] flex items-center justify-center">
        <CustomTitle title="Enter Template">
          <Link href={`/template/${state.id}/${name}`} passHref>
            <a>
              <div className="flex items-center justify-center">
                <span className="mr-[4px] text-[#60a5fa]">
                  <HiArrowNarrowRight size={38} />
                </span>
              </div>
            </a>
          </Link>
        </CustomTitle>
      </div>
      <div className="flex justify-center items-center text-gray-500 font-semibold text-[20px] w-[100%]">
        <input
          type="text"
          value={name}
          disabled
          className="w-full max-w-[90%] px-3 py-1 rounded-full bg-white md:w-full"
        />
      </div>
    </div>
  );
};

export default TemplateCard;
