// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { useEffect, useState } from "react";
import Hero from "../components/HeroComponent";
import Button from "../components/Button";
import PlainInfoBox from "../components/PlainInfoBox";
import WhySection from "../components/WhySection";
import { doGet } from "./makeAPICall";
import ImageWithCTA from "../components/ImageWithCTA";
import Grid from "../components/Grid";
import useWindowSize from "@components/useWindowResizeHook";
const getTokenFromAPi = () => {
  console.log("making fetch");
  fetch("/api/fetchToken", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      resp.json().then((data) => {
        console.log(data);
      });
    })
    .catch((e) => {
      console.error(`Error Fetching Token`, e);
    });
};
export default function Homepage() {
  const size = useWindowSize();
  const [fetchedMentors, setFetchedMentors] = useState([]);
  const [mentors, setMentors] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
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
      "waitlist?$top=12&$select=id,name,email,major,university,preprofessionTrack",
      setFetchedMentors,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {}
    );
    getTokenFromAPi();
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
      <Hero
        heading={"Take charge of your future."}
        heroContent={
          "The one-stop-shop of resources to empower you to make the right decision in high school, " +
          "college, adn beyond. It's finally here."
        }
        kind={"primary"}
        src={"/assets/image%2052.png"}
        imagePosition={"right"}
        btnText={"Get Started"}
        containerClassName={"h-[90vh]"}
      />
      <div className={"w-full bg-[#FFEFED]"}>
        <ImageWithCTA
          data={{
            leftHeaderText: "What do you want to be when you grow up?",
            leftText: "Talk to a college student you admire for custom advice.",
            leftButtonText: "Get Advice",
            leftButtonKind: "primary",
            leftButtonClass: "w-[120px]",
            leftImage: "/assets/image%207.png",
            rightHeaderText: "What do you want to be when you grow up?",
            rightText: "Talk to a college student you admire for custom advice.",
            rightButtonText: "Give Advice",
            rightButtonKind: "primary",
            rightButtonClass: "w-[120px]",
            rightImage: "/assets/image%208.png",
          }}
        />
      </div>
      <div
        className={
          "hidden h-[556px] w-full bg-[url('/assets/Frame%2011.png')] bg-contain bg-no-repeat md:block"
        }></div>

      <h2 className="why-header text-center text-4xl font-extrabold leading-10 text-[#272d67]">
        Why get advice on Northstarre?{" "}
      </h2>
      <div className={"flex w-full flex-col gap-4 px-0 md:grid md:grid-cols-5 md:px-24"}>
        <div className={"flex flex-col items-center md:col-span-2"}>
          <PlainInfoBox
            title={"Know Your Options."}
            content={"10+"}
            footer={"majors captured by our experts across universities."}
            className={"bg-[url('/assets/sun.svg')] bg-left-top bg-no-repeat"}
          />
          <PlainInfoBox
            title={"Customized to Your Needs."}
            content={"15+"}
            footer={"topics that are on the table for discussion with you rmentor. That change as you grow."}
          />
          <PlainInfoBox
            title={"Talk to the Experts, Directly."}
            content={"Hundreds"}
            footer={"of experts that have been in your shoes. And are living your dreams."}
          />
        </div>
        <div className={"flex flex-col items-center md:col-span-3"}>
          {mentors.length ? (
            <Grid rows={mentors} shouldDisplaySchool={false} shouldDisplayMajor={true} />
          ) : (
            "Loading Mentor Info"
          )}
        </div>
      </div>

      <WhySection
        heading={"Why Give Advice on Northstarre?"}
        className={"rounded-[20px]"}
        isReverse={true}
        footerText={() => (
          <p>
            At Northstarre, we believe students are{" "}
            <span className="font-semibold text-red-600">untapped experts.</span> Give back and get paid.
          </p>
        )}
        points={[
          {
            src: "/assets/ellipse%2020.png",
            description1: () => <span>Give back to students, just like you.</span>,
            description2: () => "",
          },
          {
            src: "/assets/ellipse%2021.png",
            description1: () => <span className="font-semibold text-red-600">$20 for every 30 minutes.</span>,
            description2: () => <span>Get paid for what you’re good at.</span>,
          },
          {
            src: "/assets/ellipse%2022.png",
            description1: () => <span>& gain a network of mentees.</span>,
            description2: () => <span>Join a network of mentors</span>,
          },
        ]}
      />

      <div
        className={
          "mx-0 mb-12 flex h-[600px] flex-col items-center justify-start rounded-[20px] bg-[url('/assets/image%209.png')] bg-cover text-center md:mx-48"
        }>
        <span className={"font-700 mt-[34px] text-2xl  font-bold text-[#272d67]"}>
          The average person spends{" "}
          <span className={"text-red-600"}>90,000 hours at work over a lifetime.</span>
        </span>
        <span className={"font-700 text-2xl font-bold text-[#272d67]"}>
          {" "}
          Feel empowered to make the right career decisions for your life.
        </span>
        <div className={"mt-4 flex w-full flex-row justify-around px-0 sm:mx-0 md:mx-24 md:px-48"}>
          <Button
            kind={"primary"}
            size={"md"}
            text={"Give Advice"}
            className={"my-2 w-[180px]"}
            isLoading={false}
          />
          <Button
            kind={"primary"}
            size={"md"}
            text={"Get Advice"}
            className={"my-2 w-[180px]"}
            isLoading={false}
          />
        </div>
      </div>
    </>
  );
}
