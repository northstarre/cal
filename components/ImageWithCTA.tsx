// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from "react";
import Button from "./Button";

export default function ImageWithCTA({ data }) {
  return (
    <div
      className={
        "grid w-full grid-cols-1 gap-y-4 py-8 px-4 sm:grid-cols-1 md:grid-cols-2 md:gap-x-4 md:px-10 lg:grid-cols-2 lg:gap-y-0 lg:px-16"
      }>
      <div className={"flex w-full flex-col items-start"}>
        <img className={data.leftImageClass} src={data.leftImage} />
        <span className={"font-700 mt-3 text-[27px] font-bold leading-[32px] text-[#272d67]"}>
          {data.leftHeaderText}{" "}
        </span>
        <p className={"font-500 mb-3 font-[Raleway] text-lg leading-[28px] text-[#272d67] md:text-2xl"}>
          {data.leftText}
        </p>
        <Button
          kind={data.leftButtonKind}
          className={data.leftButtonClass}
          text={data.leftButtonText}
          isLoading={false}
          onClick={data.leftOnClick}
        />
      </div>
      <div className={"mt-4 flex w-full flex-col items-start md:mt-0 md:items-end"}>
        <img className={data.RightImageClass} src={data.rightImage} />
        <span className={"font-700 mt-3 text-[27px] font-bold leading-[32px] text-[#272d67] "}>
          {data.rightHeaderText}{" "}
        </span>
        <p className={"font-500 mb-3 font-[Raleway] text-lg leading-[28px] text-[#272d67] md:text-2xl"}>
          {data.rightText}
        </p>
        <Button
          kind={data.rightButtonKind}
          className={data.rightButtonClass}
          text={data.rightButtonText}
          isLoading={false}
          onClick={data.rightOnClick}
        />
      </div>
    </div>
  );
}
