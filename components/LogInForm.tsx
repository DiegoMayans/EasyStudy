import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { ReactFormEvent, ReactInputChange, ReactStateSetter } from "../types";
import { useDispatch } from "./GlobalStateProvider";

interface IProps {
  setIsLogInHidden: ReactStateSetter;
}

const LogInForm = ({ setIsLogInHidden }: IProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ id: "", password: "" });
  const router = useRouter();
  const dispatch = useDispatch();

  const inputStyle = "mt-3 outline-none border-bgray border-[1px] w-full p-2 bg-gray-100";

  const handleChange = (e: ReactInputChange) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: ReactFormEvent) => {
    e.preventDefault();

    const response = await axios.post("/api/login", formData);
    const { email, username, userId } = response.data;

    dispatch({
      id: userId,
      email,
      username,
    });

    router.push("/home");
    setIsLogInHidden(true);
  };

  return (
    <form className="flex flex-col w-[300px] mt-3" onSubmit={(e) => handleSubmit(e)}>
      <input
        onChange={(e) => {
          handleChange(e);
        }}
        name="id"
        type="text"
        className={`${inputStyle}`}
        placeholder="Username / Email"
      />
      <div className={`${inputStyle} flex items-center justify-between`}>
        <input
          onChange={(e) => {
            handleChange(e);
          }}
          name="password"
          type={showPassword ? "text" : "password"}
          className={"w-[220px] bg-gray-100 outline-none"}
          placeholder="Password"
          autoComplete="new-password"
        />
        <div
          className="mr-2 text-xl text-gray-400"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? <BiShow /> : <BiHide />}
        </div>
      </div>

      <div className="relative mt-[3rem] w-full">
        <button
          className="bg-primary w-full rounded-lg p-3 text-white font-semibold text-xl"
          type="submit"
        >
          Log In
        </button>
      </div>
    </form>
  );
};

export default LogInForm;
