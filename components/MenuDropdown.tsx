/* eslint-disable */
//@ts-nocheck
import React, { useState } from "react";
import { defaultAvatarSrc } from "@lib/profile";
import crypto from "crypto";

const Index = ({ options, text }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="mx-auto">
      <div className="container mx-auto flex justify-center ">
        <div className="mb-0">
          <div className="relative">
            <div
              className="flex cursor-pointer items-center justify-between bg-white"
              onClick={() => setShow(!show)}>
              <p className="text-[#272D67] mr-6 flex h-full cursor-pointer items-center border-b-2 border-transparent py-3 pl-3 text-base font-medium tracking-normal hover:text-indigo-700 focus:outline-none">
                {text}
              </p>
            </div>
            {show && (
              <ul className="visible absolute mt-2 w-48 rounded-[10px] border border-[#272d67] bg-white py-1 opacity-100 shadow transition duration-300 z-[1000]">
                {options.map((itm) => (
                  <li
                    className="cursor-pointer py-3   px-3 text-sm font-medium leading-3 tracking-normal text-gray-600 hover:text-indigo-600"
                    onClick={() => {
                      itm.onClick();
                    }}>
                    {itm.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfileDropDown = ({ options, img }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="ml-auto">
      <div className="container mx-auto flex justify-center ">
        <div className="mb-0">
          <div className="relative">
            <div className="flex h-full items-center">
              <button
                aria-label="dropdown"
                className="relative flex w-full cursor-pointer items-center justify-end border-b-2 border-transparent text-gray-800 hover:text-gray-900 focus:border-gray-800 focus:text-gray-900 focus:outline-none"
                onClick={() => setShow(!show)}>
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={img ?? defaultAvatarSrc( {md5: crypto.createHash("md5").update("Northstarre is best for college grads").digest("hex")})}
                  alt="profile picture"
                />
              </button>
            </div>
            {show && (
              <ul className="visible absolute right-[10px] mt-2 w-48 rounded-[10px] border border-[#272d67] bg-white py-1 opacity-100 shadow transition duration-300 z-[9999]">
                {options.map((itm) => (
                  <li
                    className="cursor-pointer py-3   px-3 text-sm font-medium leading-3 tracking-normal text-gray-600 hover:text-indigo-600"
                    onClick={() => {
                      itm.onClick();
                    }}>
                    {itm.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
