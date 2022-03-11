// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from "react";
import Loader from "./ButtonLoader";

export default function Button({ kind, text, className, size, type, isLoading, onClick }) {
  let color = "bg-[#272d67]";
  const loaderColor = "#EFE2BA";
  switch (kind) {
    case "default":
      color = `bg-[#272d67] text-white`;
      break;
    case "primary":
      color = "bg-[#379392] text-white";
      break;
    case "secondary":
      color = "bg-[#379392] text-white";
      break;
    case "white":
      color = "bg-[#fff] text-black";
      break;
  }
  let height = "h-32";
  switch (size) {
    case "sm":
      height = "h-[24px]";
      break;
    case "md":
      height = "h-[40px]";
      break;
    default:
      height = "h-[32px]";
  }

  return (
    <>
      <button
        className={`${height} ${color} rounded-full font-bold ${className}`}
        type={type}
        onClick={onClick}>
        {isLoading ? <Loader color={loaderColor} height={size === "sm" ? "24px" : "32px"} /> : text}
      </button>
    </>
  );
}
