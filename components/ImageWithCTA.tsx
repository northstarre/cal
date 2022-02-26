// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from "react";
import Button from "./Button";

export default function ImageWithCTA({ data }) {
  return (
    <div
      className={
        "grid w-full grid-cols-1 gap-y-4 p-8 sm:grid-cols-1  md:grid-cols-2 md:gap-x-4 lg:grid-cols-2 lg:gap-y-0"
      }>
      <div className={"flex w-full flex-col items-start"}>
        <img src={data.leftImage} />
        <span className={"font-700 text-xl font-bold text-[#272d67]"}>{data.leftHeaderText} </span>
        <p className={"font-500 text-xl text-[#272d67]"}>{data.leftText}</p>
        <Button
          kind={data.leftButtonKind}
          className={data.leftButtonClass}
          text={data.leftButtonText}
          isLoading={false}
        />
      </div>
      <div className={"flex w-full flex-col items-end"}>
        <img src={data.rightImage} />
        <span className={"font-700 text-xl font-bold text-[#272d67]"}>{data.rightHeaderText} </span>
        <p className={"font-500 text-xl text-[#272d67]"}>{data.rightText}</p>
        <Button
          kind={data.rightButtonKind}
          className={data.rightButtonClass}
          text={data.rightButtonText}
          isLoading={false}
        />
      </div>
    </div>
  );
}
