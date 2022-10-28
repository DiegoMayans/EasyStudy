import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";

import { BASE_URL } from "../../../utils";
import { ITemplate } from "../../../types";
import Item from "../../../components/TemplatePageComponents/Item";
import CustomTitle from "../../../components/CustomTitle";

const Template = ({ data }: { data: ITemplate }) => {
  const router = useRouter();
  const { items, name, description } = data;
  const { pid, tid } = router.query;

  const [editableName, setEditableName] = useState(false);
  const [templateName, setTemplateName] = useState(name);
  const [isDeleteShown, setIsDeleteShown] = useState(false);

  let itemsList: JSX.Element[] = [];

  if (items) {
    items.forEach((item) => {
      const new_item = <Item data={item.data} _idx={item._idx} subject={item.subject} />;

      itemsList.push(new_item);
    });
  }

  const handleTemplateDelete = () => {
    setIsDeleteShown(true);
  };

  const handleNameChange = async () => {
    setEditableName(false);
    if (templateName === name) {
      return;
    }
    await axios.patch(`${BASE_URL}/api/template/${pid}/${tid}`, { name: templateName });
    router.push(`/template/${pid}/${templateName}`);
  };

  useEffect(() => {
    if (!data) {
      router.push("/home");
    }
  }, [data, router]);

  return (
    <div className="min-h-[79vh]">
      <div
        className={`${
          isDeleteShown ? "" : "hidden"
        } absolute bg-[#0000005a] top-0 h-[960px] w-[100%] z-[100]`}
      >
        <div className="flex justify-center items-center h-[70%]">
          <div className="shadow-xl bg-white h-[35vh] w-[75vw] rounded-xl">
            <div className="flex flex-col justify-around items-center py-6 px-3 h-full">
              <h4 className="font-semibold text-center">
                This will <span className="font-bold">permanently delete</span> this template. Are
                you sure you want to continue?
              </h4>

              <div className="w-[80%] mb-[1rem] flex justify-between">
                <button
                  className="hover:bg-gray-100 border-2 border-[#0000009e] font-semibold text-[#0000009e] rounded-lg px-[15%] py-1"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDeleteShown(false);
                  }}
                >
                  No
                </button>
                <button
                  className="hover:bg-red-100 border-2 border-red-400 rounded-lg px-[15%] py-1 text-red-400 font-semibold"
                  onClick={(e) => {
                    e.preventDefault();
                    axios.delete(`${BASE_URL}/api/template/${pid}/${tid}`);
                    router.push("/home");
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-[2.5rem] my-[2rem] flex flex-col">
        <div className="flex gap-2 items-center justify-between">
          {editableName ? (
            <div className="flex items-center gap-2">
              <input
                autoFocus
                className="border-2 rounded-[10px] px-2 py-1 outline-none bg-[#0000] w-[70%] text-2xl font-bold text-tgray"
                value={templateName}
                onChange={(e) => {
                  setTemplateName(e.target.value);
                }}
              />
              <button
                className="ml-1 mr-3 text-3xl text-green"
                onClick={(e) => {
                  e.preventDefault();
                  handleNameChange();
                }}
              >
                <BsCheckCircle />
              </button>
              {/* <CustomTitle title="Cancel" adjust={{ bottom:"10px" }} > */}
              <button
                className="text-2xl text-[#ee5252fb]"
                onClick={(e) => {
                  e.preventDefault();
                  setTemplateName(name);
                  setEditableName(false);
                }}
              >
                <MdOutlineCancel />
              </button>
              {/* </CustomTitle> */}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-tgray">{name}</h1>
              <CustomTitle title="Edit Name" adjust={{ left: "90%", bottom: "90%" }}>
                <button
                  className="text-lg text-[#1a73e8a0]"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditableName(true);
                  }}
                >
                  <FaRegEdit />
                </button>
              </CustomTitle>
            </div>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              handleTemplateDelete();
            }}
            className="rounded-lg px-2 py-1 text-red-400 border-2 border-red-400 font-semibold hover:bg-red-200"
          >
            Delete
          </button>
        </div>

        <div className="mt-2 text-gray-500">{description}</div>

        <div className="mt-6 bg-white rounded-xl shadow-md h-min">
          <div className="py-4 px-[2rem] flex flex-col gap-2 text-lg">{itemsList}</div>
        </div>

        <div className="flex justify-center w-full">
          <button
            className="text-gray-100 font-semibold w-[80%] bg-green py-2 rounded-lg mt-[2rem] hover:bg-[#94daa0]"
            onClick={(e) => {
              e.preventDefault();

              router.push(`/template/${pid}/${tid}/test`);
            }}
          >
            Begin Test
          </button>
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

export default Template;
