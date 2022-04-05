/* eslint-disable */
//@ts-nocheck
import React, { useEffect, useState } from "react";
import Hero, { HeroBanner } from "../components/HeroComponent";
import WhySection from "../components/WhySection";
import Testimonial from "../components/Testimonial";
import { doGet } from "../makeAPICall";
import Navbar from "@components/Navbar";
import { NextPageContext } from "next";
import { getSession } from "@lib/auth";
import prisma from "@lib/prisma";
import { inferSSRProps } from "@lib/types/inferSSRProps";
import { useRouter } from "next/router";

export default function GiveAdvice(props: inferSSRProps<typeof getServerSideProps>) {
  const navigate = useRouter();
  return (
    <>
      <Navbar isBeta={false} signedIn={props.signedIn} profile={props.user} />
      <HeroBanner
        className={"bg-[url('/assets/hero-home.jpg')]"}
        imgSrc={"/assets/hero-home.jpg"}
        height={100}
        width={100}
        altText={"home"}
        buttonClassName={"hero-btn-alter"}
        heading={"We believe students are untapped experts."}
        subText={" With your expertise, we can democratize access to professional resources. "}
        buttonText={"Submit an Application"}
        buttonClick={() => { navigate.push("https://forms.gle/1bXcraidJrvn32bg8"); }}
      />
      <WhySection
        heading={"How It Works"}
        flexclass={"py-0 px-4 lg:px-0"}
        className={"rounded-[20px] container mx-auto"}
        butntext={"Submit an Application"}
        butnwrap={"justify-center mb-3 mt-3"}
        btnClick={() => { props.signedIn ? console.log("No Action") :  navigate.push("/auth/signupe"); }}
        isReverse={true}
        footerText={() => (
          <p>
            You’re an expert. Get paid to be one.
          </p>
        )}
        points={[
          {
            src: "./assets/Ellipse%2020.png",
            description1: () => <span>Set up your profile and tell us what you’d like to coach.</span>,
            description2: () => "",
          },
          {
            src: "./assets/Ellipse%2021.png",
            description1: () => (
              <span>Set your availability. As little or as much as you’d like to give back.</span>
            ),
            description2: () => "",
          },
          {
            src: "./assets/Ellipse%2022.png",
            description1: () => <span>Sit back and get paid for your time spent with a student.</span>,
            description2: () => "",
          },
        ]}
      />
      <Testimonial />
      <div className={`container mx-auto px-4 md:px-6 lg:px-4`}>
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
