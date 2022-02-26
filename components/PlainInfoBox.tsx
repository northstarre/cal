// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from "react";

export default function PlainInfoBox({ className, footer, title, content }) {
  return (
    <>
      <div
        className={`my-[24px] flex  min-h-[160px] w-[400px] max-w-[561px] flex-col items-center rounded-[20px] border border-gray-300 p-2 text-center text-[#272d67] ${className}`}>
        <span className={"text-xl"}>{title}</span>
        <span className={"my-4 text-5xl font-extrabold"}>{content}</span>
        <span>{footer}</span>
      </div>
    </>
  );
}
