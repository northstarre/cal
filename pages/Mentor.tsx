/* eslint-disable */
//@ts-nocheck
import React, { useEffect, useState } from "react";
import Hero from "../components/HeroComponent";
import WhySection from "../components/WhySection";
import Testimonial from "../components/Testimonial";
import { doGet } from "./makeAPICall";
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
        heroContent={
          "With your expertise, we can democratize access to academic resources to enable high school students to imagine and realize their journey at their dream schools."
        }
        kind={"primary"}
        src={"/assets/image%202.png"}
        imagePosition={"right"}
        btnText={"Sign Up"}
      />
      <WhySection
        heading={"How It Works"}
        className={"rounded-[20px]"}
        isReverse={true}
        footerText={() => (
          <p>
            Get paid <span className="font-semibold text-red-600">$20 for every 30 minutes</span> of your
            time. You're an expert. Get paid to be one.
          </p>
        )}
        points={[
          {
            src: "./assets/ellipse%2020.png",
            description1: () => <span>Set up your profile and tell us what you'd like to coach.</span>,
            description2: () => "",
          },
          {
            src: "./assets/ellipse%2021.png",
            description1: () => (
              <span>Set your availability. As little or as much as you'd like to give back.</span>
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
    </>
  );
}
