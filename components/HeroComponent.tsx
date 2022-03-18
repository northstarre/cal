// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from "react";
import Button from "./Button";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function Index({
  heading,
  heroContent,
  kind,
  src,
  imagePosition,
  btnText,
  containerClassName,
  flexclass,
  btnclass,
}) {
  const image = (
    <div className="flex w-full items-center md:w-1/2">
      <img
        loading="lazy"
        className="rounded-[90px]"
        src={src}
        alt="Two Developer Girls writing code"
        role="img"
      />
    </div>
  );
  const content = () => (
    <div className="flex w-full flex-col items-center justify-center md:w-1/2 ">
      <div className="px-4 lg:px-0">
        <h3
          role="heading"
          className="mt-10 max-w-[550px] text-2xl font-bold leading-6 text-[#272d67] md:my-0 xl:text-5xl">
          {heading}
        </h3>
        <p
          role="contentinfo"
          className="max-w-[480px] pt-2 font-[Raleway] font-normal text-[#272D67] lg:pt-4 xl:text-[22px] xl:leading-[26px]">
          {heroContent}
        </p>
        <Button
          kind={kind}
          text={btnText}
          className={`${btnclass} hero-btn mt-6 font-[Raleway] text-2xl text-[#EFE2BA] shadow-[0_4px_4px_rgba(0,0,0,0.25)] `}
          size={"md"}
          isLoading={false}
        />
      </div>
    </div>
  );
  return (
    <div className="overflow-y-hidden">
      <div className="pb-0">
        <dh-component>
          <section className={`w-full pt-6 pb-16 ${containerClassName} bg-white`}>
            <div className={`2xl:container 2xl:mx-auto`}>
              <div
                className={`flex flex-col space-y-4  px-1 md:flex-row md:space-y-0 md:space-x-20 md:px-2 ${flexclass}`}>
                {imagePosition === "left" ? image : content()}
                {imagePosition === "right" ? image : content()}
              </div>
            </div>
          </section>
        </dh-component>
      </div>
    </div>
  );
}

export default Index;
