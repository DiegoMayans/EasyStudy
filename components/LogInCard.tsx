import React, { useEffect, useState } from "react";
import { RiUserLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { CgClose } from "react-icons/cg";
import { CredentialResponse, ReactButtonEvent, ReactStateSetter } from "../types";

import { useDispatch } from "./GlobalStateProvider";
import { handleCredentialResponse } from "../utils/functions";
import { MdOutlineArrowBackIos } from "react-icons/md";
import LogInForm from "./LogInForm";

interface IProps {
  setIsLogInHidden: ReactStateSetter;
  setIsSignUpHidden: ReactStateSetter;
}

const LogInCard = ({ setIsLogInHidden, setIsSignUpHidden }: IProps) => {
  const [emailChosen, setEmailChosen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    google.accounts.id.initialize({
      /* global google */
      client_id: process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN,
      callback: (res: CredentialResponse) => handleCredentialResponse(res, dispatch),
      cancel_on_tap_outside: false,
      context: "signup",
    });
  }, []);

  const buttonStyle =
    "flex items-center text-[15px] text-tgray font-semibold w-[276px] h-[44px] border-[1px] border-bgray mt-3 px-[1rem]";
  const spanStyle = "text-center w-full";

  const handleClose = (e: ReactButtonEvent) => {
    e.preventDefault();

    setIsLogInHidden(true);
  };

  const handleSignUp = (e: ReactButtonEvent) => {
    e.preventDefault();

    setIsLogInHidden(true);
    setIsSignUpHidden(false);
  };

  const handleBack = (e: ReactButtonEvent) => {
    setEmailChosen(false);
  };

  return (
    <div className="z-[99999] bg-[#00000080] absolute w-full h-full">
      <div className="flex w-full justify-center">
        <div className="w-[350px] sm:w-[450px] relative rounded-xl bg-white text-center my-[10vh] mx-[3vh] flex flex-col justify-between h-[80vh]">
          <button
            className="text-tgray right-6 top-6 absolute"
            onClick={(e) => {
              handleClose(e);
            }}
          >
            <CgClose size={30} />
          </button>

          <div className="pt-[5rem] flex flex-col items-center">
            <span className="font-bold text-center text-3xl my-[1rem]">Log in to EasyStudy</span>

            {emailChosen ? (
              <div>
                <button className="absolute top-6 left-6 text-tgray" onClick={(e) => handleBack(e)}>
                  <MdOutlineArrowBackIos size={28} />
                </button>
                <LogInForm setIsLogInHidden={setIsLogInHidden} />
              </div>
            ) : (
              <div>
                <button
                  className={`${buttonStyle}`}
                  onClick={(e) => {
                    e.preventDefault();

                    google.accounts.id.prompt((notification) => {
                      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                        console.log("Something went wrong. Try signing up in another way.");
                      }
                    });

                    setIsLogInHidden(true);
                  }}
                >
                  <FcGoogle size={20} />
                  <span className={spanStyle}>Continue With Google</span>
                </button>
                <button
                  className={`${buttonStyle}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setEmailChosen(true);
                  }}
                >
                  <RiUserLine size={20} />
                  <span className={spanStyle}>Use email / username</span>
                </button>
              </div>
            )}
          </div>

          <div className="h-[64px] border-t-[1px] border-bgray flex flex-col justify-center">
            <span className="text-[15px] text-gray-500">
              Don&apos;t have an account? &nbsp;
              <button className="text-primary font-semibold" onClick={(e) => handleSignUp(e)}>
                Sign Up
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInCard;
