// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
export default function PlainInfoBox({ className, footer, title, content }) {
  return (
    <>
      <div
        className={`my-[24px] flex  min-h-[277px] w-[100%] max-w-[100%] flex-col items-center rounded-[20px] border-[3px] border-[#c3c5d5] p-5 px-2 text-center text-[#272d67] shadow-[0_4px_4px_rgba(0,0,0,0.25)] md:px-5 ${className}`}>
        <span className={"text-[28px] leading-[30px] lg:ml-12 lg:text-[34px] xl:ml-10 2xl:ml-0"}>
          {title}
        </span>
        <span
          className={
            "my-2 font-[Roboto] text-[54px] font-bold leading-[68px] md:text-[50px] lg:text-[54px] lg:leading-[78px] xl:text-[84px] xl:leading-[98px]"
          }>
          {content}
        </span>
        <span className={"font-[Raleway] text-xl font-normal lg:text-2xl"}>{footer}</span>
      </div>
    </>
  );
}
