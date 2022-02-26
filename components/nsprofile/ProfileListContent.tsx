/* eslint-disable */
//@ts-nocheck
import React from "react";
import PencilIcon from "../PencilIcon";

export default function ProfileListContent({ items, header, isEditable, className, onEditClick }) {
  return (
    <div className={`flex flex-col bg-[#FFF6DB] ${className} rounded-[20px] p-4`}>
      <div className={"font-700 flex flex-row justify-between text-2xl font-semibold text-[#272d67]"}>
        <h4>{header}</h4>
        {isEditable ? (
          <div className={"float-right"} onClick={onEditClick}>
            <PencilIcon />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={"py-4"}>
        <div className={"font-400 flex flex-col text-xl text-[#272d67]"}>
          {items
            ? items.map((itm, idx) => (
                <div key={idx} className={"flex w-full flex-row"}>
                  <img src={itm.image} className={"h-[24px] w-[50px] px-4"} alt={"list item icon"} />
                  <span>{itm.value}</span>
                </div>
              ))
            : " No Content Added. Please finish filling out your profile."}
        </div>
      </div>
    </div>
  );
}
