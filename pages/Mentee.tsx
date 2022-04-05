// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from "react";
import Hero, { HeroBanner } from "../components/HeroComponent";
import WhySection from "../components/WhySection";
import MentorMarketplace from "../components/MentorMarketplace";
import Button from "../components/Button";
import useWindowSize from "@components/useWindowResizeHook";
import Navbar from "@components/Navbar";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { getSession } from "@lib/auth";
import prisma from "@lib/prisma";
import { inferSSRProps } from "@lib/types/inferSSRProps";

export default function ExpertLandingPage(props: inferSSRProps<typeof getServerSideProps>) {
  const size = useWindowSize();
  const navigate = useRouter();
  return (
    <>
      <Navbar isBeta={false} signedIn={props.signedIn} profile={props.user} />
      <HeroBanner
        className={"bg-[url('/assets/mentee.jpg')]"}
        imgSrc={"/assets/mentee.jpg"}
        height={100}
        width={100}
        altText={"home"}
        heading={"Meet Your Mentors."}
        subText={
          " At Northstarre, we're bringing the best college students from across the country directly to you, on your schedule."
        }
        buttonClassName={"hero-btn-alter"}
        buttonText={"Help Me Choose"}
        buttonClick={() => {
          navigate.push(
            "https://docs.google.com/forms/d/e/1FAIpQLSd0LBwlCOufKiHXnv3zdNxfYqTA90wBwVu51tN6EKuVJcNwgA/viewform"
          );
        }}
      />
      <WhySection
        heading={"Why Northstarre Mentors?"}
        className={"rounded-[20px] bg-[#FFEFED]"}
        btnClick={() => navigate.push("/payment/pricing")}
        gapclass={"md:flex-row md:flex-wrap md:justify-center md:gap-x-36 lg:gap-x-8"}
        butntext={"Pricing"}
        butnwrap={"justify-center mt-4"}
        isReverse={false}
        footerText={() => ""}
        points={[
          {
            src: "/assets/Ellipse%2023.png",
            description1: () => <span>The best of the best,</span>,
            description2: () => <span> across the country.</span>,
          },
          {
            src: "/assets/Ellipse%2024.png",
            description1: () => <span>On your own schedule.</span>,
            description2: () => "",
          },
          {
            src: "/assets/Ellipse%2025.png",
            description1: () => <span>As few or as many 1:1s</span>,
            description2: () => <span> as you&lsquo;d like.</span>,
          },
          {
            src: "/assets/Ellipse%2026.png",
            description1: () => <span>At as few or as many</span>,
            description2: () => <span>colleges as you’d like.</span>,
          },
        ]}
      />
      <MentorMarketplace heading={"Your Mentors"} size={size} />
      {!props.signedIn && (
        <div
          className={
            "font-400 my-12 flex flex-col  items-center justify-center rounded bg-[#FFEFED] py-4 text-center font-['raleway'] text-[#272d67]"
          }>
          <span className={"text-2xl"}>
            Need help choosing a mentor? Give us 1 minute, and we’ll find you the right expert. That’s right
            for you.
          </span>
          <Button
            kind={"primary"}
            size={"md"}
            text={"Sign Up"}
            className={
              "my-2 w-[210px] font-[Raleway] text-2xl text-[#F7ECE1] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            }
            isLoading={false}
            onClick={() => navigate.push("/auth/login")}
          />
        </div>
      )}
      <div
        className={
          "mx-auto mb-12 flex h-[388px] max-w-[1066px] flex-col items-center justify-start rounded-[20px] bg-[url('/assets/imagemel.png')] bg-cover text-center"
        }>
        <a
          href={"https://forms.gle/u3zArRVTsagN5K396"}
          className={"font-700 mt-[34px] font-[Raleway] text-2xl font-bold leading-[28px] text-[#272d67]"}>
          Don’t see a mentor you want to talk to?
        </a>
        <span className={"font-700 mb-3 font-[Raleway] text-2xl font-bold leading-[28px] text-[#272d67]"}>
          {" "}
          Help us onboard who you want to see.
        </span>
        <Button
          kind={"primary"}
          size={"md"}
          text={"Give Us Feedback"}
          className={
            "my-2 w-[220px] font-[Raleway] text-2xl text-[#F7ECE1] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
          }
          isLoading={false}
          onClick={() => {
            navigate.push("https://forms.gle/u3zArRVTsagN5K396");
          }}
        />
      </div>
      <div className={`container mx-auto px-4 md:px-6 lg:px-4`}>
        <div className={"my-16 flex w-full flex-col font-[Raleway] font-normal md:flex-row"}>
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
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  const signedIn = session?.user?.id ?? false;
  const isBeta = null;
  let user = {};

  if (signedIn) {
    user = await prisma.user.findFirst({
      where: {
        id: session?.user?.id,
      },
      select: {
        id: true,
        startTime: true,
        endTime: true,
        username: true,
        name: true,
        email: true,
        bio: true,
        avatar: true,
        timeZone: true,
        completedOnboarding: true,
        willGiveAdvice: true,
        willGetAdvice: true,
        preProfessionalTrack: true,
        school: true,
        schoolYear: true,
        zipCode: true,
        describer: true,
        selectedCalendars: {
          select: {
            externalId: true,
            integration: true,
          },
        },
      },
    });
    if (!user.completedOnboarding) {
      return { redirect: { permanent: false, destination: "/getting-started" } };
    }
  }
  return {
    props: {
      user,
      isBeta,
      signedIn,
    },
  };
}
