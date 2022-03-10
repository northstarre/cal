/* eslint-disable */
//@ts-nocheck
import React, { useEffect, useState } from "react";
import Hero from "../components/HeroComponent";
import WhySection from "../components/WhySection";
import Testimonial from "../components/Testimonial";
import { doGet } from "../makeAPICall";
import Navbar from "@components/Navbar";

export default function GiveAdvice() {
  const [profileToDisplay, setProfile] = useState(undefined);
  useEffect(() => {
    const id = "e8443f32-92e9-439b-895b-a49cfae0ee81";
    doGet(`userInfo?$filter=userObjectId eq ${id}`, setProfile, () => {
      return "avoiding Es lint";
    });
  }, []);
  return (
    <>
      <Navbar isBeta={false} signedIn={profileToDisplay ? true: false} profile={profileToDisplay} />
      <Hero
        heading={"We believe students are the untapped experts."}
        flexclass={"items-end"}
        heroContent={
          "With your expertise, we can democratize access to professional resources. "
        }
        kind={"primary"}
        src={"/assets/image%202.png"}
        imagePosition={"right"}
        btnText={"Submit an Application"}
        btnclass={"hero-btn-alter"}
      />
      <WhySection
        heading={"How It Works"}
        flexclass={"py-0 px-0 lg:px-0"}
        className={"rounded-[20px] 2xl:container 2xl:mx-auto"}
        butntext={"Submit an Application"}
        butnwrap={"justify-center mb-3 mt-3"}
        isReverse={true}
        footerText={() => (
          <p>
            You’re an expert. Get paid to be one.
          </p>
        )}
        points={[
          {
            src: "./assets/ellipse%2020.png",
            description1: () => <span>Set up your profile and tell us what you’d like to coach.</span>,
            description2: () => "",
          },
          {
            src: "./assets/ellipse%2021.png",
            description1: () => (
              <span>Set your availability. As little or as much as you’d like to give back.</span>
            ),
            description2: () => "",
          },
          {
            src: "./assets/ellipse%2022.png",
            description1: () => <span>Sit back and get paid for your time spent with a student.</span>,
            description2: () => "",
          },
        ]}
      />
      <Testimonial />
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
