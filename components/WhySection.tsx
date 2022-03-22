// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from "react";
import Button from "../components/Button";

function whyPoint({ src, description1, description2 }, isReverse, calculatedWidth) {
  const addlclass = isReverse ? "flex-col-reverse space-y-reverse" : "flex-col";
  return (
    <div className={`flex ${addlclass} items-center justify-center space-y-4`}>
      <div className={`w-full ${calculatedWidth}`}>
        <img src={src} alt="avatar 1" className="w-full" role="img" />
      </div>
      <div className={`flex ${addlclass} items-center justify-center space-y-2 font-[Raleway]`}>
        <p className="text-center text-base text-2xl leading-none text-[#272d67]">{description1()}</p>
        {description2() ? (
          <p className="text-center text-2xl leading-none text-[#272d67]">{description2()}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default function Index({
  heading,
  subText,
  className,
  points,
  isReverse,
  footerText,
  butntext,
  butnwrap,
  flexclass,
  btnClick,
  gapclass,
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const gridCountOnLarge = ``;
  const calculatedWidths = points.length <= 3 ? "w-72" : "w-60";
  return (
    <div className={`overflow-y-hidden ${className}`}>
      <div className={`flex flex-col items-center justify-center py-12 md:px-4 md:px-6 ${flexclass}`}>
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="why-header text-4xl font-bold text-[#272d67] md:leading-[60px] lg:text-[50px]">
            {heading}
          </h2>
          {subText ? (
            <p className="w-11/12 text-center text-base leading-normal text-gray-600">{subText}</p>
          ) : (
            ""
          )}
        </div>
        <div
          className={`mt-6 flex flex-col gap-y-12 md:mt-10 lg:flex-row lg:gap-y-14 lg:gap-x-4 lg:px-4 xl:mt-14 xl:gap-y-0 xl:gap-x-24 ${gapclass}`}>
          {points.map((pt) => whyPoint(pt, isReverse, calculatedWidths))}
        </div>
        <div>
          {footerText() ? (
            <p className="mt-[18px] w-full text-center font-[Raleway] text-[30px] leading-normal text-[#272d67]">
              {footerText()}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className={`flex w-[100%] ${butnwrap}`}>
          <Button
            kind={"primary"}
            size={"md"}
            text={butntext}
            onClick={
              btnClick
                ? btnClick
                : () => {
                    console.log("No Action Defined");
                  }
            }
            className={
              "my-2 mx-4 w-[auto] min-w-[220px] px-6 font-[Raleway] text-2xl text-[#F7ECE1] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            }
            isLoading={false}
          />
        </div>
      </div>
    </div>
  );
}
