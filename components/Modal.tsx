/* eslint-disable */
//@ts-nocheck
import React from "react";

export default function Index(props) {
  const { header, isOpen, handlePopUp } = props;

  return (
    <div className={`bg-gray-50 ${isOpen ? "" : "hidden"}`}>
      <div
        id="modal"
        className={`flex items-center justify-center py-8 px-4 md:py-10 md:px-6 lg:container lg:mx-auto ${
          isOpen ? "" : "hidden"
        }`}>
        <div id="popup" className="fixed inset-0 z-50 flex w-full justify-center">
          <div
            onClick={() => handlePopUp(false)}
            className="absolute inset-0 z-0 h-full w-full bg-gray-900"
          />
          <div className="container mx-auto">
            <div className="flex h-full w-full items-center justify-center">
              <div className="fixed w-10/12 overflow-y-auto rounded-md bg-white shadow sm:h-auto md:w-8/12 lg:w-1/2 2xl:w-2/5">
                {header ? (
                  <div className="flex items-center justify-between rounded-tl-md rounded-tr-md bg-gray-100 px-4 py-7 md:px-8 md:py-4">
                    <p className="text-base font-semibold">{header}</p>
                    <button onClick={() => handlePopUp(false)} className="focus:outline-none">
                      <svg
                        width={28}
                        height={28}
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M21 7L7 21"
                          stroke="#A1A1AA"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 7L21 21"
                          stroke="#A1A1AA"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  ""
                )}
                {props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
