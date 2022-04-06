// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { useEffect, useState } from "react";
import Hero, { HeroBanner } from "../components/HeroComponent";
import Button from "../components/Button";
import PlainInfoBox from "../components/PlainInfoBox";
import WhySection from "../components/WhySection";
import { doGet } from "../makeAPICall";
import ImageWithCTA from "../components/ImageWithCTA";
import Grid from "../components/Grid";
import useWindowSize from "@components/useWindowResizeHook";
import Navbar from "@components/Navbar";
import { NextPageContext } from "next";
import { getSession } from "@lib/auth";
import { inferSSRProps } from "@lib/types/inferSSRProps";
import Loader from "@components/Loader";
import prisma from "@lib/prisma";
import { useRouter } from "next/router";

export default function Homepage(props: inferSSRProps<typeof getServerSideProps>) {
  console.log(props);
  const size = useWindowSize();
  const [fetchedMentors, setFetchedMentors] = useState([]);
  const [mentors, setMentors] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (fetchedMentors.length > 0) {
      onMentorsFetch(fetchedMentors);
    }
  }, [fetchedMentors, size]);
  const fetchData = () => {
    setLoading(true);
    doGet(
      "WaitListView?$top=12&$select=id,name,email,university,major,majorshortcode,unishortcode,preprofessionTrack",
      setFetchedMentors,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {}
    );
    //getTokenFromAPi();
    setLoading(false);
  };

  const onMentorsFetch = (data) => {
    const remainingData = [...data];
    const defaultSize = size.width < 400 ? 2 : size.width < 1500 ? 3 : 4;
    const rows = [];
    while (remainingData.length >= 1) {
      const newRowbkp = remainingData.splice(0, defaultSize);
      const newRow = newRowbkp.map((itm) => {
        return {
          ...itm,
          university: itm.UniShortCode ?? itm.University,
          major: itm.MajorShortCode ?? itm.Major,
        };
      });
      rows.push(newRow);
    }
    setMentors(rows);
  };

  return (
    <>
      <Navbar isBeta={false} signedIn={props.signedIn} profile={props.user} />
      <HeroBanner
        className={"bg-[url('/assets/hero-home.jpg')]"}
        imgSrc={"/assets/hero-home.jpg"}
        height={100}
        width={100}
        altText={"home"}
        heading={"A Professional Network for Students, Finally."}
        subText={"Find mentors across the country, and join a community of students just like you."}
        buttonText={"Get Started"}
        buttonClick={() => {
          if (props.signedId) {
            props.user?.willGiveAdvice ? navigate.push("/Availability") : navigate.push("/QNA");
          } else {
            navigate.push("/auth/login");
          }
        }}
      />
      <div className={"w-full rounded-[20px]"}>
        <div className={`2xl:container 2xl:mx-auto`}>
          <ImageWithCTA
            data={{
              leftHeaderText: "What do you want to be when you grow up?",
              leftText: "Talk to a college student you admire for custom advice.",
              leftButtonText: "Get Advice",
              leftButtonKind: "primary",
              leftButtonClass: "w-[160px] text-[#F7ECE1] text-2xl font-[Raleway]",
              leftImageClass: "w-full max-h-[380px] rounded-[20px]",
              leftImage: "/assets/home-left.jpg",
              rightHeaderText: "We believe students are untapped experts.",
              rightText: "Get paid to mentor students, just like you.",
              rightButtonText: "Give Advice",
              rightButtonKind: "primary",
              rightButtonClass: "w-[160px] text-[#F7ECE1] text-2xl font-[Raleway]",
              RightImageClass: "w-full max-h-[380px] rounded-[20px]",
              rightImage: "/assets/home-right.jpg",
              rightOnClick: () => navigate.push("/Mentor"),
              leftOnClick: () => navigate.replace("/events"),
            }}
          />
        </div>
      </div>
      <div className={`mt-15 container mx-auto px-4 md:px-6 lg:px-4`}>
        <h1 className="why-header mb-2 text-center text-4xl font-bold leading-loose text-[#272d67] lg:text-[50px]">
          Did You Know?
        </h1>
        <div
          className={
            "align-center mx-auto mb-20 flex w-full flex-col items-center justify-center font-[Raleway] font-normal md:flex-row"
          }>
          <div
            className={
              "md:max-w-1/4 mx-auto my-2 flex min-h-[450px] flex-col items-center justify-center rounded-[20px] bg-[url('/assets/change-majors-stat.jpg')] bg-contain md:my-0 md:mx-2 md:w-1/4"
            }>
            <h1 className="why-header h-max-[80%] h-auto text-left text-[80px] font-bold leading-loose leading-10 text-white">
              30%
            </h1>
            <span className={"align-end self-end px-[25px] pt-8 text-center text-[22px] font-bold text-white"}>
              of undergraduates change their major at least once.
            </span>
          </div>
          <div
            className={
              "md:max-w-1/4 md:y-0 mx-auto flex min-h-[450px] flex-col items-center justify-center rounded-[20px] bg-[url('/assets/professionals-stat.jpg')] bg-contain md:mx-2 md:w-1/4"
            }>
            <h1 className="why-header h-max-[80%] h-auto text-left text-[80px] font-bold leading-loose leading-10 text-white">
              95%
            </h1>
            <span className={"self-end px-[25px] pt-8 text-center text-[22px] font-bold text-white"}>
              of young professionals wish they could change something about their education.
            </span>
          </div>
          <div
            className={
              "md:max-w-1/4 mx-auto my-2 flex min-h-[450px] flex-col items-center justify-center rounded-[20px] bg-[url('/assets/average-price-stat.jpg')] bg-contain md:my-0 md:mx-2 md:w-1/4"
            }>
            <h1 className="why-header h-max-[80%] h-auto text-left text-[80px] font-bold leading-loose leading-10 text-white">
              $104K
            </h1>
            <span className={"flex place-self-end pt-8 px-[25px] text-center text-[22px] font-bold text-white"}>
              is the average price of a four-year public university education.
            </span>
          </div>
        </div>
      </div>

      <div className={`container mx-auto px-4 md:px-6 lg:px-4`}>
        <h2 className="why-header mb-3 text-center text-4xl font-bold leading-10 text-[#272d67] lg:text-[50px]">
          Why Get Advice on Northstarre?{" "}
        </h2>
        <div className={"flex w-full flex-col gap-4 px-0 md:grid md:grid-cols-5"}>
          <div className={"flex flex-col items-start md:col-span-2"}>
            <PlainInfoBox
              title={"Know Your Options."}
              content={"40+"}
              footer={"majors captured by our mentors across universities."}
              className={
                "bg-[url('/assets/sun.svg')] bg-[top_20px_center] bg-no-repeat pt-20 lg:bg-[left_20px_top_20px] lg:pt-[30px]"
              }
            />
            <PlainInfoBox
              title={"Customized to Your Needs."}
              content={"15+"}
              footer={
                "topics that are on the table for discussion with your mentor. That change as you grow."
              }
              className={
                "bg-[url('/assets/Database.svg')] bg-[top_10px_center] bg-no-repeat pt-20 lg:bg-[left_10px_top_10px] lg:pt-[30px]"
              }
            />
            <PlainInfoBox
              title={"Talk to the Experts, Directly."}
              content={"Hundreds"}
              footer={"of experts across 30+ universities that have been in your shoes. "}
              className={
                "bg-[url('/assets/user.svg')] bg-[top_20px_center] bg-no-repeat pt-20 lg:bg-[left_10px_top_23px] lg:pt-[30px]"
              }
            />
          </div>
          <div className={"flex flex-col items-start md:col-span-3"}>
            {mentors.length ? (
              <Grid rows={mentors} shouldDisplaySchool={true} shouldDisplayMajor={true} />
            ) : (
              <Loader className={"loader"} />
            )}
            <div className="mt-3 flex w-[100%] content-end items-end justify-center text-center">
              <Button
                kind={"primary"}
                size={"md"}
                text={"Talk to a Mentor"}
                className={"my-2 mx-4 w-[220px] font-[Raleway] text-2xl text-[#F7ECE1]"}
                isLoading={false}
                onClick={() => {
                  navigate.push("/Mentee");
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          "mx-32 mb-12 mt-8 flex h-[600px] flex-col items-start justify-start rounded-[20px] bg-[url('/assets/home-bottom.jpg')] bg-cover bg-center bg-no-repeat text-left font-[Raleway]"
        }>
        <span
          className={
            "font-700 mt-[34px] ml-5 max-w-[350px] text-center text-[30px] font-bold leading-tight text-white"
          }>
          The average person spends 90,000 hours at work over a lifetime. Feel empowered to make the right
          career decisions for your life.
        </span>

        <div
          className={
            "mt-4 flex w-1/2 flex-row flex-wrap items-start justify-start px-0 sm:mx-0  md:flex-row"
          }>
          <Button
            kind={"primary"}
            size={"md"}
            text={"Give Advice"}
            className={"my-2 mx-4 w-[180px] py-1 font-[Raleway] text-2xl text-[#F7ECE1]"}
            isLoading={false}
            onClick={() => navigate.push("/Mentor")}
          />
          <Button
            kind={"primary"}
            size={"md"}
            text={"Get Advice"}
            className={"my-2 mx-4 w-[180px] py-1 font-[Raleway] text-2xl text-[#F7ECE1] "}
            isLoading={false}
            onClick={() => navigate.push("/events")}
          />
        </div>
      </div>
      <div className={`container mx-auto px-4 md:px-6 lg:px-4`}>
        <div className={"my-16 flex w-full flex-col font-[Raleway] font-normal md:flex-row"}>
          <div className={"flex w-[100%] flex-col"}>
            <h2 className="why-header text-center text-[20px] font-normal leading-[29px] text-[#272d67] md:text-[25px]">
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
