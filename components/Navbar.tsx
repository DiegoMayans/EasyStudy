import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "../styles/Navbar.module.css";
import Logo from "../utils/applogo.png";
import { useGlobalState } from "./GlobalStateProvider";
import { BiLogOut } from "react-icons/bi";
import { BsFillCaretDownFill } from "react-icons/bs";
import { GoChevronDown, GoChevronRight } from "react-icons/go";

interface IProps {
  setIsLogInHidden: Dispatch<SetStateAction<boolean>>;
}

const Navbar = ({ setIsLogInHidden }: IProps) => {
  const [state] = useGlobalState();
  const router = useRouter();
  const query = router.query;
  const [showOptions, setShowOptions] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const buttonStyle =
    "cursor-pointer hover:bg-bgray pl-1 pr-2 py-1 rounded-md text-left flex items-center text-sm";

  const handleLogIn = (e: any) => {
    e.preventDefault();

    setIsLogInHidden(false);
  };

  useEffect(() => {
    if (query.s) {
      setIsLogInHidden(false);
    }
  }, [query.s, setIsLogInHidden]);

  return (
    <div className="h-[60px] flex items-center justify-between border-b border-gray">
      <div className="p-2">
        <Link href="/home" passHref>
          <a>
            <div className="w-[50px] mx-4">
              <Image className="cursor-pointer" src={Logo} alt="App logo" layout="responsive" />
            </div>
          </a>
        </Link>
      </div>

      <div
        className="sm:hidden flex items-center justify-center cursor-pointer"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        {showMenu ? <GoChevronDown /> : <GoChevronRight />}
        <h3 className="font-semibold">Menu</h3>
      </div>

      <div className="hidden sm:flex ml-[20%] h-full items-center">
        <Link href="/home">
          <div className="cursor-pointer border-l-[1px] w-fit px-[2rem] h-full flex items-center justify-center">
            <h3 className={`${styles.title} font-semibold`}>Home</h3>
          </div>
        </Link>
        <Link href="/about">
          <div className="cursor-pointer border-x-[1px] w-fit px-[2rem] h-full flex items-center justify-center">
            <h3 className={`${styles.title} font-semibold`}>About Us</h3>
          </div>
        </Link>
        <Link href="/template">
          <div className="cursor-pointer border-r-[1px] w-fit px-[2rem] h-full flex items-center justify-center">
            <h3 className={`${styles.title} font-semibold`}>New Template</h3>
          </div>
        </Link>
      </div>

      {showMenu && (
        <div className="sm:hidden absolute w-[60%] left-[20%] top-[60px] bg-white drop-shadow-lg">
          <div className="flex justify-center w-full">
            <div className="flex flex-col gap-[1rem] items-center py-4 font-semibold text-primary w-full">
              <Link href="/home">
                <a
                  onClick={() => {
                    setShowMenu(false);
                  }}
                >
                  Home
                </a>
              </Link>
              <div className="border-[1px] w-[80%]"></div>
              <Link href="/template">
                <a
                  onClick={() => {
                    setShowMenu(false);
                  }}
                >
                  New Template
                </a>
              </Link>
              <div className="border-[1px] w-[80%]"></div>

              <Link href="/about">
                <a
                  onClick={() => {
                    setShowMenu(false);
                  }}
                >
                  About Us
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}

      {state.id ? (
        <div className="relative p-2">
          <div
            className="flex gap-2 mr-[2rem] cursor-pointer"
            onClick={() => {
              setShowOptions(!showOptions);
            }}
          >
            <div className={"select-none text-left flex items-center text-gray-700 font-semibold"}>
              {state.username}
            </div>
            <div className="flex items-center hover:bg-gray-200 p-1 rounded-lg">
              <BsFillCaretDownFill />
            </div>
          </div>

          <div
            className={`${
              showOptions ? null : "hidden"
            } z-[100] top-11 right-3 absolute bg-white w-[200px] p-[10px] drop-shadow-md rounded-md border-[1px] border-bgray`}
          >
            <div className="flex flex-col gap-2 justify-center">
              <div
                className={
                  "px-3 pt-2 text-left flex items-center text-sm text-gray-600 font-semibold"
                }
              >
                User: {state.username}
              </div>
              <div
                className={`${buttonStyle} mt-3 font-semibold text-red-400`}
                onClick={() => {
                  localStorage.removeItem("user");
                  router.push("/home");
                  router.reload();
                }}
              >
                <div className="text-lg">
                  <BiLogOut />
                </div>
                <span className="pl-1">Log Out</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <button
            className="text-white font-semibold text-lg w-[90px] py-[6px] m-3 hover:opacity-90 bg-primary rounded-md"
            onClick={(e) => {
              handleLogIn(e);
            }}
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
