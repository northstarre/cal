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

  btnClick,
}) {
  const image = (
    <div className="flex w-full justify-end md:w-1/2">
      <img
        loading="lazy"
        className="mt-5 rounded-[20px] md:mt-0 lg:rounded-[90px]"
        src={src}
        alt="Hero Image"
        role="img"
      />
    </div>
  );
  const content = () => (
    <div className="flex w-full flex-col justify-center md:w-1/2 ">
      <div className="lg:px-0">
        <h3
          role="heading"
          className="why-header max-w-[550px] text-4xl font-bold text-[#272d67] md:leading-[60px] lg:text-[50px]">
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
          className={`${btnclass} hero-btn mt-6 font-[Raleway] text-2xl text-[#EFE2BA] shadow-[0_4px_4px_rgba(0,0,0,0.25)]`}
          size={"md"}
          isLoading={false}
          onClick={btnClick}
        />
      </div>
    </div>
  );
  return (
    <div className="overflow-y-hidden">
      <div className="pb-0">
        <dh-component>
          <section className={`w-full pt-24 pb-16 md:pt-6 ${containerClassName} bg-white`}>
            <div className={`mx-auto px-4 md:px-10 lg:px-16`}>
              <div className={`flex flex-col  space-y-4 md:flex-row md:space-y-0 md:space-x-20 ${flexclass}`}>
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
