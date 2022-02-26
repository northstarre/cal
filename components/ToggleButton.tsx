/* eslint-disable */
//@ts-nocheck
import React, { useEffect, useState } from "react";

export default function Button({ kind, text, className, size, type, onClick, disabled }) {
  const [color, setColor] = useState("border-[#272d67]");
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (isActive) {
      switch (kind) {
        case "default":
          setColor(`bg-[#272d67] text-white`);
          break;
        case "primary":
          setColor("bg-[#60ab67] text-white");
          break;
        case "secondary":
          setColor("bg-[#379392] text-white");
          break;
      }
      onClick(isActive);
    } else {
      switch (kind) {
        case "default":
          setColor(`border-solid border-2 border-[#272d67] text-[#272d67]`);
          break;
        case "primary":
          setColor("border-solid border-2 border-[#60ab67] text-[#60ab67]");
          break;
        case "secondary":
          setColor("border-solid border-2 border-[#379392] text-[#379392]");
          break;
      }
      onClick(isActive);
    }
  }, [isActive]);
  let height = "h-32";
  switch (size) {
    case "sm":
      height = "h-[24px]";
      break;
    case "md":
      height = "h-[32px]";
      break;
    default:
      height = "h-[32px]";
  }

  return (
    <>
      <button
        className={`${height} ${color}  ${className}`}
        onClick={() => setIsActive(!isActive)}
        disabled={disabled}
        type={type}>
        {" "}
        {text}
      </button>
    </>
  );
}
