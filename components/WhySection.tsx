// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from "react";

function whyPoint({ src, description1, description2 }, isReverse, calculatedWidth) {
  const addlclass = isReverse ? "flex-col-reverse space-y-reverse" : "flex-col";
  return (
    <div className={`flex ${addlclass} items-center justify-center space-y-4`}>
      <div className={`w-full ${calculatedWidth}`}>
        <img src={src} alt="avatar 1" className="w-full" />
      </div>
      <div className={`flex ${addlclass} items-center justify-center space-y-2`}>
        <p className="text-center text-base text-lg leading-none text-[#272d67]">{description1()}</p>
        {description2() ? (
          <p className="text-center text-lg leading-none text-[#272d67]">{description2()}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default function Index({ heading, subText, className, points, isReverse, footerText }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const gridCountOnLarge = ``;
  const calculatedWidths = points.length <= 3 ? "w-72" : "w-60";
  return (
    <div className={`overflow-y-hidden ${className}`}>
      <div className="flex flex-col items-center justify-center py-12 md:px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="why-header text-4xl font-extrabold leading-10 text-[#272d67]">{heading}</h2>
          {subText ? (
            <p className="w-11/12 text-center text-base leading-normal text-gray-600">{subText}</p>
          ) : (
            ""
          )}
        </div>
        <div
          className={`mt-6 flex flex-col gap-y-12 md:mt-10 md:flex-row md:gap-y-14 md:gap-x-24 xl:mt-14 xl:gap-y-0`}>
          {points.map((pt) => whyPoint(pt, isReverse, calculatedWidths))}
        </div>
        <div>
          {footerText() ? (
            <p className="mt-[18px] w-full text-center text-xl leading-normal text-[#272d67]">
              {footerText()}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
