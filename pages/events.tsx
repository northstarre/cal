// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { useEffect, useState } from "react";
import Hero from "../components/HeroComponent";
import Event from "@components/Event";
// import WhySection from "../components/WhySection";
// import MentorMarketplace from "../components/MentorMarketplace";

import useWindowSize from "@components/useWindowResizeHook";
import Navbar from "@components/Navbar";
import { doGet } from "../makeAPICall";

export default function Events() {
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
        heading={"Get to know our team." + " Join our Q&As."}
        heroContent={"Listen in or actively participate in our Q&As. " + "Free to you. And made for you."}
        kind={"primary"}
        src={
          "https://s3-alpha-sig.figma.com/img/8910/6ed7/8e11d74ac9467939e352672bd5d8a94a?Expires=1648425600&Signature=WSdUin9srnuxfDcOzFyX9cAvuwED7IdfAI8rppTbIPx7lu6CFCqg~7XRGHeDFBIr0QvSgsBSrj9ymOiW6fwLaZO8M2kANiS4nguEBc9lL5cuH5XLaiJqlKPUMRj33drjcC2Lrv6F7we6Yt~3pdwW6RFeOHg1eln2QLBOTMG9d-USDpnhd1lF0bxo~JDO09KCI~~3QPH~B3iZVqSpeKaHoclrKW9dwHt63wl3BN2VUTmK4EXqFxgb4g-vGo0a5Wh735qhXnKq4qTAFHxwNZG-5nwjcE05WdXj4FiInoV-maEgltJZDq4QT8~09zj-UpbWiAWA9kTcEv-WqRx1RaHVfw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
        }
        imagePosition={"right"}
        btnText={"Get Started"}
        containerClassName={"h-[auto]"}
      />
      <div className={`2xl:container 2xl:mx-auto`}>
        <h2 className="why-header mb-3 text-center text-[50px] font-bold leading-10 text-[#272d67]">
          {"Northstarre Events"}
        </h2>
        <div className={"flex w-full flex-col gap-4 px-0 md:grid md:grid-cols-5"}>
          <div className={"flex flex-col items-start md:col-span-2"}></div>
        </div>
      </div>
      <section className="event">
        <div className="event__filterbtncontainer my-14 mx-auto flex max-w-xl items-center justify-around px-2 text-xl font-extrabold text-[#818997]">
          <button className="event__filterbtncontainer">All</button>
          <button className="event__filterbtncontainer">College</button>
          <button className="event__filterbtncontainer">Majors</button>
          <button className="event__filterbtncontainer">Miscellaneous</button>
        </div>
        <ul className="event_eventslist container mx-auto max-w-[1280px] gap-3 sm:grid sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          <Event />
          <Event />
          <Event />
          <Event />
          <Event />
          <Event />
          <Event />
          <Event />
          <Event />
        </ul>

        <div
          className={
            "mx-auto my-14 flex h-[600px] max-w-[1014px] flex-col items-center justify-start rounded-[20px] bg-[url('/assets/image%20HomeFooter.png')] bg-cover text-center font-[Raleway]"
          }>
          <span className={"font-700 mt-[34px] text-[20px]  font-bold text-[#272d67]"}>
            {"Want to talk to college mentor 1:1?"}
          </span>
          <span className={"font-700 text-[20px] font-bold text-[#272d67]"}>
            {"Meet the Northstarre Team."}
          </span>
          <div className={"mt-4 flex w-full flex-row justify-center px-0 sm:mx-0 md:mx-24 md:px-48"}>
            <button className="h-[40px] whitespace-nowrap rounded-full bg-[#379392] px-4 text-2xl font-bold text-[#EFE2BA] ">
              {"Meet Your Mentor"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
