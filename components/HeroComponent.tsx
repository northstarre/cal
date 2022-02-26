// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from "react";
import Button from "./Button";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function Index({ heading, heroContent, kind, src, imagePosition, btnText, containerClassName }) {
  const image = (
    <div className="flex w-full items-center md:w-1/2">
      <img loading="lazy" className="rounded" src={src} alt="Two Developer Girls writing code" role="img" />
    </div>
  );
  const content = () => (
    <div className="flex w-full flex-col justify-center md:w-1/2">
      <div className="md:px-4 lg:px-6">
        <h3
          role="heading"
          className="mt-10 text-2xl font-semibold leading-6 text-[#272d67] md:my-0 xl:text-4xl xl:leading-10">
          {heading}
        </h3>
        <p role="contentinfo" className="pt-2 text-base text-[#272d67] lg:pt-4 xl:text-2xl xl:leading-normal">
          {heroContent}
        </p>
        <Button kind={kind} text={btnText} className={"hero-btn mt-6"} size={"md"} isLoading={false} />
      </div>
    </div>
  );
  return (
    <div className="overflow-y-hidden">
      <div className="pb-16">
        <dh-component>
          <section className={`py-12 ${containerClassName} bg-white 2xl:container 2xl:mx-auto`}>
            <div className="flex flex-col  space-y-4 md:flex-row md:space-y-0 md:space-x-8">
              {imagePosition === "left" ? image : content()}
              {imagePosition === "right" ? image : content()}
            </div>
          </section>
        </dh-component>
      </div>
    </div>
  );
}

export default Index;
