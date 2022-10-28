import { useRouter } from "next/router";
import React, { BaseSyntheticEvent, useState } from "react";
import axios from "axios";

import Item from "../components/TemplateComponents/Item";
import { ITemplate, ReactStateSetter } from "../types";
import { BASE_URL } from "../utils";
import { useGlobalState } from "../components/GlobalStateProvider";

const Template = () => {
  const [state, dispatch] = useGlobalState();
  const [nameInput, setNameInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [itemCount, setItemCount] = useState(1);
  const [firstKey, setFirstKey] = useState(true);
  const [blankError, setBlankError] = useState(false);
  //Arreglar tipo de _items
  const [_items, set_items]: [any, ReactStateSetter] = useState([]);
  const router = useRouter();

  const label_style = "block text-primary font-bold text-lg mt-3";
  const input_style = "mt-1 p-2 w-full border-[1px] border-gray-400 outline-primary rounded-lg";

  const handleChange = (
    idx: number,
    item_subject: string,
    item_data: { _idx: number; value: string }[]
  ) => {
    let new_items = _items;

    new_items[idx] = {
      _idx: idx,
      subject: item_subject,
      data: item_data,
    };

    set_items(new_items);
  };

  const [items, setItems]: [JSX.Element[], ReactStateSetter] = useState([]);

  const handleClick = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    setItems([...items, <Item key={itemCount} idx={itemCount} handleChange={handleChange} />]);
    setItemCount(itemCount + 1);
  };

  const handleClear = () => {
    setFirstKey(!firstKey);
    setNameInput("");
    setDescInput("");
    setItemCount(1);
    set_items([]);
    setItems([]);
  };

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    if (!nameInput) {
      setBlankError(true);
      return;
    }

    const userId = state.id;
    const date = new Date();

    let template: ITemplate = {
      name: nameInput,
      description: descInput,
      items: _items,
      timestamp: date,
    };

    template.items.forEach((item, i) => {
      item.data.forEach((data, j) => {
        const new_data = { ...data, belongsTo: item.subject };
        template.items[i].data[j] = new_data;
      });
    });

    await axios.post(`${BASE_URL}/api/template`, { userId, template });

    router.push(`/home`);
  };

  return (
    <div className="m-[3rem] flex justify-center items-center">
      <div className="w-full max-w-[1000px] ">
        <div className="text-center">
          <h1 className="text-center font-bold text-3xl">Create Template</h1>
          <h3 className="text-gray-400 m-3 p-2">
            Build your own studying template and begin learning.
          </h3>
        </div>

        <form action="/template" className="p-3 mt-5" onSubmit={handleSubmit}>
          <div>
            <label className={label_style} htmlFor="name">
              Template Name
            </label>
            <input
              id="name"
              className={`${input_style}`}
              value={nameInput}
              placeholder="Name"
              autoFocus
              onChange={(e) => {
                setNameInput(e.target.value);
              }}
            />
            <label className={label_style} htmlFor="template_description">
              Description
            </label>
            <textarea
              id="template_description"
              className={`${input_style}`}
              placeholder="Description... (optional)"
              rows={2}
              value={descInput}
              onChange={(e) => setDescInput(e.target.value)}
            />
          </div>

          <Item key={firstKey ? 0 : -1} idx={0} handleChange={handleChange} />
          {items}

          <div className="flex flex-col justify-center">
            <div className="w-full flex justify-center">
              <div className="flex justify-between items-center w-[500px] my-3">
                <button
                  className="md:mx-[10%] py-1 px-2 text-white bg-primary border-2 border-primary rounded-md p-[3px]"
                  onClick={(e) => handleClick(e)}
                >
                  Add Item
                </button>
                <button
                  className="md:mx-[10%] py-1 px-2 text-white bg-primary border-2 border-primary rounded-md p-[3px]"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClear();
                  }}
                >
                  Clear Form
                </button>
              </div>
            </div>

            {blankError && (
              <div>
                <h4 className="text-red-500 text-center text-lg">
                  You shouldn&#39;t leave blank fields
                </h4>
              </div>
            )}
            <div className="w-full flex justify-center mt-3">
              <input
                type="submit"
                className="w-full max-w-[500px] cursor-pointer my-3 py-1 px-3 text-xl text-white bg-green border-2 border-green rounded-md p-[3px]"
                value="Finish Template"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Template;
