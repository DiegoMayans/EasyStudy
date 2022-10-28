import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";

import { BASE_URL } from "../utils";
import { validateEmail } from "../utils/functions";
import { getUserById } from "../utils/queries";
import { useDispatch } from "./GlobalStateProvider";
import InputError from "./InputError";

interface IProps {
  setIsSignUpHidden: Dispatch<SetStateAction<boolean>>;
}

const initialFormData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = ({ setIsSignUpHidden }: IProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [emptyFields, setEmptyFields] = useState(true);
  const [noMatch, setNoMatch] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const inputStyle = "mt-3 outline-none border-bgray border-[1px] w-full p-2 bg-gray-100";
  const submitColor = isDisabled ? "text-gray-400" : "text-white";
  const submitBg = isDisabled ? "bg-gray-200" : "bg-primary";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isDisabled) return;

    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    const newUserRef = await axios.post(`${BASE_URL}/api/auth`, newUser);

    const userId = newUserRef.data._key.path.segments[1];

    const user = await getUserById(userId);

    dispatch({
      id: userId,
      email: user?.email,
      username: user?.username,
      templates: [],
      token: "",
    });
    setIsSignUpHidden(true);
    router.push("/home");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUsernameBlur = () => {
    if (formData.username && formData.username.length < 4) {
      setUsernameMessage("Username must be at least 4 characters long");
    }
  };

  const handleEmailBlur = () => {
    if (formData.email && !validateEmail(formData.email)) {
      setEmailMessage("Enter a valid email address");
    }
  };

  const handlePasswordBlur = () => {
    if (formData.password && formData.password.length < 8) {
      setInvalidPassword(true);
    }
  };

  const handleConfirmBlur = () => {
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setNoMatch(true);
    }
  };

  useEffect(() => {
    if (!formData.username || !formData.password || formData.email || formData.confirmPassword) {
      setEmptyFields(false);
    }
    if (formData.username.length >= 4) {
      setUsernameMessage("");
    }
    if (validateEmail(formData.email)) {
      setEmailMessage("");
    }
    if (formData.password.length >= 8) {
      setInvalidPassword(false);
    }
    if (formData.confirmPassword === formData.password) {
      setNoMatch(false);
    }
    if (!emptyFields && !invalidPassword && !noMatch && !emailMessage && !usernameMessage) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formData, emailMessage, invalidPassword, noMatch, usernameMessage, emptyFields]);

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col w-[300px] mt-3">
        <input
          onChange={(e) => {
            handleChange(e);
          }}
          name="username"
          type="text"
          className={usernameMessage ? `${inputStyle} border-red-500` : `${inputStyle}`}
          placeholder="Username"
          autoComplete="username"
          onBlur={() => {
            handleUsernameBlur();
          }}
        />
        {usernameMessage && <InputError message={usernameMessage} />}

        <input
          onChange={(e) => {
            handleChange(e);
          }}
          name="email"
          type="email"
          className={emailMessage ? `${inputStyle} border-red-500` : `${inputStyle}`}
          placeholder="Email address"
          autoComplete="email"
          onBlur={() => {
            handleEmailBlur();
          }}
        />
        {emailMessage && <InputError message={emailMessage} />}

        <div
          className={
            invalidPassword || noMatch
              ? `${inputStyle} border-red-500 flex items-center justify-between`
              : `${inputStyle} flex items-center justify-between`
          }
        >
          <input
            onChange={(e) => {
              handleChange(e);
            }}
            name="password"
            type={showPassword ? "text" : "password"}
            className={"w-[220px] bg-gray-100 outline-none"}
            placeholder="Password"
            autoComplete="new-password"
            onBlur={() => {
              handlePasswordBlur();
            }}
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
        {invalidPassword ? (
          <InputError message="Password must be 8 characters long" />
        ) : (
          <h6 className={"text-left block text-gray-500 text-sm"}>
            Password must be 8 characters long
          </h6>
        )}

        <div
          className={
            noMatch
              ? `${inputStyle} border-red-500 flex items-center justify-between`
              : `${inputStyle} flex items-center justify-between`
          }
        >
          <input
            onChange={(e) => {
              handleChange(e);
            }}
            name="confirmPassword"
            type="password"
            className={"w-[220px] bg-gray-100 outline-none"}
            placeholder="Confirm Password"
            autoComplete="new-password"
            onBlur={() => {
              handleConfirmBlur();
            }}
          />
        </div>
        {noMatch && <InputError message="Passwords don't match" />}

        <div className="relative mt-[3rem] w-full">
          <span
            className={`${submitColor} pointer-events-none text-white font-semibold text-xl absolute left-[121px] top-[10px]`}
          >
            Create
          </span>
          <input
            disabled={isDisabled}
            value=""
            type="submit"
            className={`w-full ${submitBg} rounded-lg p-3`}
          />
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
