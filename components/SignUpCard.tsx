import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { FcGoogle } from "react-icons/fc";
import { RiUserLine } from "react-icons/ri";
import { MdOutlineArrowBackIos } from "react-icons/md";

import SignUpForm from "./SignUpForm";
import { useDispatch } from "./GlobalStateProvider";
import { CredentialResponse } from "../types";
import { handleCredentialResponse } from "../utils/functions";

interface IProps {
  setIsSignUpHidden: Dispatch<SetStateAction<boolean>>;
  setIsLogInHidden: Dispatch<SetStateAction<boolean>>;
}

const SignUpCard = ({ setIsSignUpHidden, setIsLogInHidden }: IProps) => {
  const [isSelectHidden, setIsSelectHidden] = useState(false);
  const [showEmailSignUp, setShowEmailSignUp] = useState(false);
  const dispatch = useDispatch();

  const buttonStyle =
    "flex items-center text-[15px] text-tgray font-semibold w-[276px] h-[44px] border-[1px] border-bgray mt-3 px-[1rem]";
  const spanStyle = "text-center w-full";

  useEffect(() => {
    google.accounts.id.initialize({
      /* global google */
      client_id: process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN,
      callback: (res: CredentialResponse) => handleCredentialResponse(res, dispatch),
      cancel_on_tap_outside: false,
      context: "signup",
    });
  }, []);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setIsSignUpHidden(true);
  };

  const handleLogIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setIsSignUpHidden(true);
    setIsLogInHidden(false);
  };

  const handleGoogleSignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        console.log("Something went wrong. Try signing up in another way.");
      }
    });

    setIsSignUpHidden(true);
  };

  const handleEmailSignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setIsSelectHidden(true);
    setShowEmailSignUp(true);
  };

  const handleBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setShowEmailSignUp(false);
    setIsSelectHidden(false);
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
            <span className="font-bold text-center text-3xl my-[1rem]">Sign Up</span>

            {!isSelectHidden && (
              <div>
                <button className={`${buttonStyle}`} onClick={(e) => handleEmailSignUp(e)}>
                  <RiUserLine size={20} />
                  <span className={spanStyle}>Sign up with email</span>
                </button>
                <div className="mt-3 w-[276px]" id="googleSignUp"></div>
                <button
                  className={`googleSignUp ${buttonStyle}`}
                  onClick={(e) => {
                    handleGoogleSignUp(e);
                  }}
                >
                  <FcGoogle size={20} />
                  <span className={spanStyle}>Sign up with Google</span>
                </button>
              </div>
            )}

            {showEmailSignUp && (
              <div>
                <button className="absolute top-6 left-6 text-tgray" onClick={(e) => handleBack(e)}>
                  <MdOutlineArrowBackIos size={28} />
                </button>
                <SignUpForm setIsSignUpHidden={setIsSignUpHidden} />
              </div>
            )}
          </div>

          <div className="h-[64px] border-t-[1px] border-bgray flex flex-col justify-center">
            <span className="text-[15px] text-gray-500">
              Already have an account? &nbsp;
              <button className="text-primary font-semibold" onClick={(e) => handleLogIn(e)}>
                Log In
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpCard;
