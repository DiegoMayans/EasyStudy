import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiFillFacebook } from "react-icons/ai";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

import { footerList } from "../utils/constants";

const Footer = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center">
      <div className="px-[2rem] py-[1.5rem] text-primary text-xs border-l">
        <div className="-ml-3">
          {footerList.map((element, idx) => (
            <div className="inline-block mb-3" key={idx}>
              <Link href={`/${element[1]}`}>
                <span className="ml-3 cursor-pointer hover:underline decoration-primary">
                  {element[0]}
                </span>
              </Link>
            </div>
          ))}
        </div>
        <span className="mt-3 block text-gray-600 text-center">© 2022 Mayans, Inc. </span>
      </div>

      {router.pathname !== "/about" && (
        <div className="border-x max-w-[400px] w-[50%] p-2">
          <div className="flex flex-col items-center">
            <h6 className="font-bold underline decoration-1">Contact</h6>
            <p className="text-sm text-gray-500 font-semibold mt-2">mayanskydiego@gmail.com</p>
            <div className="flex gap-3 items-center mt-2">
              <div className="text-xl hover:text-[#bc2a8d]">
                <Link href="https://www.instagram.com/diegomayanss/" passHref>
                  <a>
                    <BsInstagram />
                  </a>
                </Link>
              </div>

              <div className="text-2xl hover:text-[#4267B2]">
                <Link href="https://www.facebook.com/diego.mayansky.3" passHref>
                  <a>
                    <AiFillFacebook />
                  </a>
                </Link>
              </div>

              <div className="text-[24px] hover:text-[#1DA1F2]">
                <Link href="https://www.facebook.com/diego.mayansky.3" passHref>
                  <a>
                    <BsTwitter />
                  </a>
                </Link>
              </div>

              <div className="text-xl hover:text-[#0073b1]">
                <Link href="https://www.linkedin.com/in/diego-mayansky-608a76254/" passHref>
                  <a>
                    <BsLinkedin />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
