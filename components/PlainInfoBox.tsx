// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from "react";

export default function PlainInfoBox({ className, footer, title, content }) {
  return (
    <>
      <div
        className={`my-[24px] flex  min-h-[277px] w-[100%] max-w-[100%] flex-col items-center rounded-[20px] border-[3px] border-[#c3c5d5] shadow-[0_4px_4px_rgba(0,0,0,0.25)] p-5 text-center text-[#272d67] ${className}`}>
        <span className={"text-[34px]"}>{title}</span>
        <span className={"text-[84px] leading-[98px] font-bold my-2 font-[Roboto]"}>{content}</span>
        <span className={"text-2xl font-normal font-[Raleway]"}>{footer}</span>
      </div>
    </>
  );
}
