// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { useEffect, useState } from "react";
import Hero from "../components/HeroComponent";
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
      "WaitListView?$top=12&$select=id,name,email,majorshortcode,unishortcode,preprofessionTrack",
      setFetchedMentors,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {}
    );
    //getTokenFromAPi();
    setLoading(false);
  };

  const onMentorsFetch = (data) => {
    const remainingData = [...data];
    const defaultSize = size.width < 400 ? 2 : size.width < 700 ? 3 : 4;
    const rows = [];
    while (remainingData.length >= 1) {
      const newRow = remainingData.splice(0, defaultSize);
      rows.push(newRow);
    }
    setMentors(rows);
  };

  return (
    <>
      <Navbar isBeta={false} signedIn={props.signedIn} profile={props.user} />
      <Hero
        heading={"A Professional Network for Students, Finally."}
        heroContent={"Find mentors across the country, and join a " + "community of students just like you."}
        kind={"primary"}
        src={"/assets/image%2052.png"}
        imagePosition={"right"}
        btnText={"Get Started"}
        containerClassName={"h-[auto]"}
        btnClick={() => {
          if (props.signedId) {
            props.user?.willGiveAdvice ? navigate.push("/Availability") : navigate.push("/QNA");
          } else {
            navigate.push("/auth/login");
          }
        }}
      />
      <div className={"w-full rounded-[20px] bg-[#FFEFED]"}>
        <div className={`2xl:container 2xl:mx-auto`}>
          <ImageWithCTA
            data={{
              leftHeaderText: "What do you want to be when you grow up?",
              leftText: "Talk to a college student you admire for custom advice.",
              leftButtonText: "Get Advice",
              leftButtonKind: "primary",
              leftButtonClass: "w-[160px] text-[#F7ECE1] text-2xl font-[Raleway]",
              leftImageClass: "w-full",
              leftImage: "/assets/image%207.png",
              rightHeaderText: "We believe students are untapped experts.",
              rightText: "Get paid to mentor students, just like you.",
              rightButtonText: "Give Advice",
              rightButtonKind: "primary",
              rightButtonClass: "w-[160px] text-[#F7ECE1] text-2xl font-[Raleway]",
              RightImageClass: "w-full",
              rightImage: "/assets/image%208.png",
              rightOnClick: () => navigate.push("/Mentor"),
              leftOnClick: () => navigate.push("/QNA"),
            }}
          />
        </div>
      </div>
      <div className={`2xl:container 2xl:mx-auto`}>
        <div className={"my-20 flex w-full flex-col font-[Raleway] font-normal md:flex-row"}>
          <div className={"flex w-3/5 flex-col text-left"}>
            <img src="/assets/Group103.png" className={"mb-3 w-[61px]"} />
            <h2 className="why-header text-left text-[34px] font-bold leading-10 text-[#272d67]">
              Did you know...
            </h2>
            <p className={"mt-5 text-2xl text-[#272d67]"}>
              <span className={"font-bold text-[#F13C20] "}>30%</span> of undergraduates change their major at
              least once.
            </p>
            <p className={"mt-5 text-2xl text-[#272d67]"}>
              <span className={"font-bold text-[#F13C20]"}>90%</span> of working professionals wish they could
              change <br /> something about their high school, college or work experience.
            </p>
            <p className={"mt-5 text-2xl text-[#272d67]"}>
              The average price of a four year public out of the state university education is{" "}
              <span className={"font-bold text-[#F13C20]"}>$104,000</span>.
            </p>
            <h4 className={"mt-5 text-2xl font-bold text-[#272d67]"}>Be Informed. Earlier</h4>
            <h4 className={"text-2xl font-bold text-[#272d67]"}>
              And set the right trajectory for your future self.
            </h4>
          </div>
          <div className={"content-left flex w-2/5 flex-row items-center gap-x-2 px-0 md:px-5"}>
            <img
              src="/assets/Group%207.png"
              className={"cursor-pointer rounded-[20px]"}
              onClick={() => navigate.push("/Mentee")}
            />
            <img
              src="/assets/Group%208.png"
              className={"cursor-pointer rounded-[20px]"}
              onClick={() => navigate.push("/QNA")}
            />
          </div>
        </div>
      </div>

      <div className={`2xl:container 2xl:mx-auto`}>
        <h2 className="why-header mb-3 text-center text-[50px] font-bold leading-10 text-[#272d67]">
          Why Get Advice on Northstarre?{" "}
        </h2>
        <div className={"flex w-full flex-col gap-4 px-0 md:grid md:grid-cols-5"}>
          <div className={"flex flex-col items-start md:col-span-2"}>
            <PlainInfoBox
              title={"Know Your Options."}
              content={"40+"}
              footer={"majors captured by our mentors across universities."}
              className={"bg-[url('/assets/sun.svg')] bg-[left_20px_top_20px] bg-no-repeat"}
            />
            <PlainInfoBox
              title={"Customized to Your Needs."}
              content={"15+"}
              footer={
                "topics that are on the table for discussion with your mentor. That change as you grow."
              }
              className={"bg-[url('/assets/Database.svg')] bg-[left_10px_top_10px] bg-no-repeat"}
            />
            <PlainInfoBox
              title={"Talk to the Experts, Directly."}
              content={"Hundreds"}
              footer={"of experts across 30+ universities that have been in your shoes. "}
              className={"bg-[url('/assets/user.svg')] bg-[left_10px_top_23px] bg-no-repeat"}
            />
          </div>
          <div className={"flex flex-col items-start md:col-span-3"}>
            {mentors.length ? (
              <Grid rows={mentors} shouldDisplaySchool={false} shouldDisplayMajor={true} />
            ) : (
              <Loader className={"loader"} />
            )}
            <div className="mt-3 flex w-[100%] justify-center text-center">
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
      <WhySection
        heading={"Why Give Advice on Northstarre?"}
        className={"rounded-[20px]"}
        butntext={"How It Works"}
        butnwrap={"justify-center mb-3 mt-3"}
        btnClick={() => navigate.push("/Mentor")}
        isReverse={true}
        footerText={() => (
          <p>
            At Northstarre, we believe students are{" "}
            <span className="font-bold text-[#F13C20]">untapped experts.</span> Give back and get paid.
          </p>
        )}
        points={[
          {
            src: "/assets/Ellipse%2020.png",
            description1: () => <span>Give back to students, just like you.</span>,
            description2: () => "",
          },
          {
            src: "/assets/Ellipse%2021.png",
            description1: () => <span className="font-bold text-[#F13C20]"></span>,
            description2: () => <span>Get paid for what you’re good at.</span>,
          },
          {
            src: "/assets/Ellipse%2022.png",
            description1: () => <span>a network of mentees.</span>,
            description2: () => <span>Join a network of mentors and gain</span>,
          },
        ]}
      />

      <div
        className={
          "mx-auto mb-12 flex h-[600px] max-w-[1014px] flex-col items-center justify-start rounded-[20px] bg-[url('/assets/image%20HomeFooter.png')] bg-cover text-center font-[Raleway]"
        }>
        <span className={"font-700 mt-[34px] text-[20px]  font-bold text-[#272d67]"}>
          The average person spends{" "}
          <span className={"text-red-600"}>90,000 hours at work over a lifetime.</span>
        </span>
        <span className={"font-700 text-[20px] font-bold text-[#272d67]"}>
          {" "}
          Feel empowered to make the right career decisions for your life.
        </span>
        <div className={"mt-4 flex w-full flex-row justify-center px-0 sm:mx-0 md:mx-24 md:px-48"}>
          <Button
            kind={"primary"}
            size={"md"}
            text={"Give Advice"}
            className={"my-2 mx-4 w-[180px] font-[Raleway] text-2xl text-[#F7ECE1]"}
            isLoading={false}
            onClick={() => navigate.push("/Mentor")}
          />
          <Button
            kind={"primary"}
            size={"md"}
            text={"Get Advice"}
            className={"my-2 mx-4 w-[180px] font-[Raleway] text-2xl text-[#F7ECE1]"}
            isLoading={false}
            onClick={() => navigate.push("/QNA")}
          />
        </div>
      </div>
      <div className={`2xl:container 2xl:mx-auto`}>
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
