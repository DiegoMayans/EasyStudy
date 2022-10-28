import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import CustomTitle from "../components/CustomTitle";
import { useGlobalState } from "../components/GlobalStateProvider";
import TemplateCard from "../components/HomeComponents/TemplateCard";
import { ITemplate } from "../types";
import { BASE_URL } from "../utils";
import { sortTemplates } from "../utils/functions";

const Home = () => {
  const [state] = useGlobalState();
  const [templatesData, setTemplatesData]: [ITemplate[], any] = useState([]);
  const [templates, setTemplates]: [JSX.Element[], any] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const res = await axios.get(`${BASE_URL}/api/template/${state.id}`);

      const sortedArr = sortTemplates(res.data);

      setTemplatesData(sortedArr);
    };
    fetchTemplates();
  }, [state.id]);

  useEffect(() => {
    let templateArray: JSX.Element[] = [];
    templatesData.forEach((e, i) => {
      templateArray.push(<TemplateCard name={e.name} key={i} />);
    });
    setTemplates(templateArray);
  }, [templatesData]);

  return (
    <div className="h-[79vh]">
      <div className="mx-[2.5rem] my-[2rem] md:mx-[20vw]">
        <div className="border-b-2 py-[20px] font-medium ">
          <span className="mr-[1rem]">Create new template:</span>
          <Link href="/template" passHref>
            <a>
              <button className="text-white font-semibold text-lg w-[150px] py-[5px] mt-[10px] hover:opacity-90 bg-green rounded-md">
                New Template
              </button>
            </a>
          </Link>
        </div>

        <div className="shadow-md mt-[20px] p-[1rem] bg-white rounded-xl">
          <div className="px-[0.65rem] lg:px-[2rem] flex items-center justify-around lg:justify-start lg:gap-[3rem]">
            <h1 className="font-bold text-2xl text-primary lg:pl-[1rem]">My Templates</h1>
            <div className="flex items-center justify-center gap-[2.5rem]">
              <CustomTitle title="Create Template">
                <Link href="/template" passHref>
                  <a>
                    <div className="flex items-center gap-2 w-max">
                      <button className="border-2 border-primary rounded-[12px] p-[3px] bg-white hover:bg-[#00000010]">
                        <AiOutlinePlus size={22} color={"#1a73e8"} />
                      </button>
                      <h5 className="text-primary hidden lg:inline">Add Template</h5>
                    </div>
                  </a>
                </Link>
              </CustomTitle>
            </div>
          </div>

          <div className="mt-[50px] flex flex-col gap-2 items-center w-full">{templates}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
