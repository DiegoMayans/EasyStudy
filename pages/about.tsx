import Link from "next/link";
import React from "react";
import { AiFillFacebook } from "react-icons/ai";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

const About = () => {
  return (
    <div className="min-h-[80vh]">
      <div className="py-[3rem] px-[1.5rem] flex flex-col gap-4">
        <h1 className=" text-4xl font-semibold">About EasyStudy</h1>
        <div className="w-full border-primary border-[1px]"></div>
        <div>
          <h2 className="text-3xl my-4">What is EasyStudy?</h2>
          <div className="flex flex-col gap-2 mr-4 sm:max-w-[80vw] mb-2">
            <p>We provide a simplified and active way of studying.</p>
            <p>People tend to forget most things they read for the first time.</p>
            <p>
              That&apos;s why the best way of absorbing knowledge is by actively practicing with
              reiterative activities.
            </p>
          </div>
        </div>
        <hr />
        <div>
          <h2 className="text-3xl my-4">Begin Studying</h2>
          <div className="flex flex-col gap-2 mr-4 sm:max-w-[80vw] mb-2">
            <p>
              We use custom templates to create a test which you should complete multiple times
              until you feel you&apos;ve incorporated all the knowledge.
            </p>
            <p>
              To begin, all you need to do is to{" "}
              <Link href="/home">
                <a className="underline decoration-1 text-primary">sign up</a>
              </Link>{" "}
              and create your first template. Stop wasting your time and get studying!
            </p>
          </div>
          <hr />
          <div className="flex flex-col gap-2 mr-4 sm:max-w-[80vw] mb-2">
            <h2 className="text-3xl my-4">What&apos;s our purpose?</h2>
            <p>
              Our objective is to help students, or any person willing to be wiser, reach their
              goals. We expect the tools we provide to be useful for those who find it difficult to
              learn.
            </p>
            <p>
              This is only the first of many future projects developed by a software engineering
              student. The personal objective behind this work is the willing to create and carry
              out a project by myself, learning loads of new things in the process.
            </p>
            <p className="font-bold underline decoration-2">Contact:</p>
            <p>
              Gmail: <span className="text-primary font-semibold">mayanskydiego@gmail.com</span>
            </p>
            <div className="flex gap-2 items-center">
              <div className="text-2xl hover:text-[#bc2a8d]">
                <Link href="https://www.instagram.com/diegomayanss/" passHref>
                  <a>
                    <BsInstagram />
                  </a>
                </Link>
              </div>

              <div className="text-3xl hover:text-[#4267B2]">
                <Link href="https://www.facebook.com/diego.mayansky.3" passHref>
                  <a>
                    <AiFillFacebook />
                  </a>
                </Link>
              </div>

              <div className="text-[28px] hover:text-[#1DA1F2]">
                <Link href="https://www.facebook.com/diego.mayansky.3" passHref>
                  <a>
                    <BsTwitter />
                  </a>
                </Link>
              </div>

              <div className="text-2xl hover:text-[#0073b1]">
                <Link href="https://www.linkedin.com/in/diego-mayansky-608a76254/" passHref>
                  <a>
                    <BsLinkedin />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
