// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { useEffect, useState } from "react";
import Hero from "../components/HeroComponent";
import Event from "@components/Event";
import Navbar from "@components/Navbar";
import EventFilter from "@components/EventFilter";
import showToast from "@lib/notification";
import EventPagination from "@components/EventPagination";
import { GetServerSidePropsContext } from "next";
import { getSession } from "@lib/auth";
import prisma from "@lib/prisma";
import crypto from "crypto";
import { inferSSRProps } from "@lib/types/inferSSRProps";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

// const eventType = ["all", "major", "skill", "career"];

export default function Events(props: inferSSRProps<typeof getServerSideProps>) {
  const eventType = ["all", ...new Set(props.events.map((event) => event.type))];
  const [events, setEvents] = useState(props.events);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [activeType, setActiveType] = useState("all");
  const navigate = useRouter();
  const eventsPerPage = 9;

  //data
  useEffect(() => {
    setEvents(props.events);
    setFilteredEvents(props.events);
  }, []);
  //data

  useEffect(() => {
    setCurrPage(1);
  }, [activeType]);

  //pagination
  const indexLastEvent = currPage * eventsPerPage;
  const indexFirstEvent = indexLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexFirstEvent, indexLastEvent);

  const paginate = (pageNumber) => setCurrPage(pageNumber);

  return (
    <>
      <Navbar isBeta={false} signedIn={props.signedIn} profile={props.user} />
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
          {eventType.map((et) => (
            <EventFilter
              key={et}
              activeType={activeType}
              setActiveType={setActiveType}
              setFilteredEvents={setFilteredEvents}
              events={events}
              value={et}
            />
          ))}
        </div>
        <ul className="event_eventslist container mx-auto max-w-7xl gap-3 sm:grid sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {currentEvents.map((event, index) => (
            <Event key={index} event={event} user={props.user} />
          ))}
        </ul>
        <EventPagination
          currPage={currPage}
          eventsPerPage={eventsPerPage}
          setCurrPage={setCurrPage}
          totalEvents={filteredEvents.length}
          paginate={paginate}
        />

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
            <button
              onClick={() => {
                navigate.push("/Mentee");
              }}
              className="h-[40px] whitespace-nowrap rounded-full bg-[#379392] px-4 text-2xl font-bold text-[#FFFFFF] ">
              {"Meet Your Mentor"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);
  const signedIn = session?.user?.id ?? false;
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
  if (!user) {
    throw new Error("User seems logged in but cannot be found in the db");
  }
  let events: string[] = [];
  const goalsResp = await fetch(`https://northstarre-api.azurewebsites.net/api/events`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (goalsResp.ok) {
    events = await goalsResp.json();
  }

  return {
    props: {
      signedIn,
      user: {
        ...user,
        emailMd5: user.email ? crypto.createHash("md5").update(user.email).digest("hex"):"",
      },
      events,
    },
  };
};
