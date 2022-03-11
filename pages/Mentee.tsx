// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { useEffect, useState } from "react";
import Hero from "../components/HeroComponent";
import WhySection from "../components/WhySection";
import MentorMarketplace from "../components/MentorMarketplace";
import Button from "../components/Button";
import useWindowSize from "@components/useWindowResizeHook";
import Navbar from "@components/Navbar";
import { doGet } from "./makeAPICall";

export default function ExpertLandingPage() {
  const size = useWindowSize();
  const [profileToDisplay, setProfile] = useState(undefined);
  useEffect(() => {
    const id = "e8443f32-92e9-439b-895b-a49cfae0ee81";
    doGet(`userInfo?$filter=userObjectId eq ${id}`, setProfile, () => {
      return "avoiding Es lint";
    });
  }, []);
  return (
    <>
      <Navbar isBeta={false} signedIn={false} profile={profileToDisplay} />
      <Hero
        heading={"Meet Your Mentors."}
        heroContent={
          "At Northstarre, we're bringing the best college students from across the country diretly to you, on your schedule."
        }
        kind={"primary"}
        src={"./assets/image%2055.png"}
        imagePosition={"left"}
        btnText={"Help Me Choose"}
      />
      <WhySection
        heading={"Why Northstarre Mentors?"}
        className={"rounded-[20px] bg-[#FFEFED]"}
        butntext={"Pricing"}
        butnwrap={"justify-center mt-4"}
        isReverse={false}
        footerText={() => ""}
        points={[
          {
            src: "/assets/ellipse%2023.png",
            description1: () => <span>The best of the best,</span>,
            description2: () => <span> across the country.</span>,
          },
          {
            src: "/assets/ellipse%2024.png",
            description1: () => <span>On your own schedule.</span>,
            description2: () => "",
          },
          {
            src: "/assets/ellipse%2025.png",
            description1: () => <span>As few or as many 1:1s</span>,
            description2: () => <span> as you'd like.</span>,
          },
          {
            src: "/assets/ellipse%2026.png",
            description1: () => <span>At as few or as many</span>,
            description2: () => <span>colleges as you’d like.</span>,
          },
        ]} 
      />
      <MentorMarketplace 
      heading={"Your Mentors"}
      size={size} />
      <div
        className={
          "font-400 my-12 flex flex-col  items-center justify-center rounded bg-[#FFEFED] py-4 text-center font-['raleway'] text-[#272d67]"
        }>
        <span className={"text-2xl"}>
          Need help choosing a mentor? Give us 1 minute, and we’ll find you the right expert. That’s right for
          you.
        </span>
        <Button kind={"primary"} size={"md"} text={"Sign Up"} className={"my-2 w-[210px] font-[Raleway] text-2xl text-[#F7ECE1] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"} isLoading={false} />
      </div>
      <div
        className={
          "max-w-[1066px] mx-auto mb-12 flex h-[388px] flex-col items-center justify-start rounded-[20px] bg-[url('/assets/imagemel.png')] bg-cover text-center"
        }>
        <span className={"font-700 mt-[34px] text-2xl leading-[28px] font-bold text-[#272d67] font-[Raleway]"}>
          Don’t see a mentor you want to talk to?
        </span>
        <span className={"font-700 text-2xl leading-[28px] font-bold text-[#272d67] font-[Raleway] mb-3"}> Help us onboard who you want to see.</span>
        <Button
          kind={"primary"}
          size={"md"}
          text={"Give Us Feedback"}
          className={"my-2 w-[220px] font-[Raleway] text-2xl text-[#F7ECE1] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"}
          isLoading={false}
        />
      </div>
      <div className={`2xl:container 2xl:mx-auto`}>
        <div className={"font-[Raleway] font-normal my-16 flex w-full flex-col md:flex-row"}>
          <div className={"flex w-[100%] flex-col"}>
            <h2 className="why-header text-center text-[25px] font-normal leading-[29px] text-[#272d67]">
            Questions? Contact support@mynorthstarre.com. We’re here to help.
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
