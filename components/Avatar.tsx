// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from "react";

export default function Avatar({ profilePhoto, displayName }) {
  return (
    <>
      <div className={"h-[136px] w-[140px] rounded-full"}>
        <img
          className={"h-[136px] w-[140px] rounded-full object-cover"}
          src={`${profilePhoto}`}
          alt={displayName}
        />
      </div>
    </>
  );
}
