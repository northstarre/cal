// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from "react";
import Button from "./Button";
import Link from "next/link";

export default function Event({ eventImage, eventTitle, eventDate, eventSpeakers }) {
  eventImage = "https://picsum.photos/200/300" || eventImage;
  eventTitle = "Harvard University" || eventTitle;
  eventDate = "Fri, March 4, 7:00 PM PT" || eventDate;
  eventSpeakers = ["tom", "jerry"] || eventSpeakers;
  // eventSpeakers = ["mo", "larry", "curly"] || eventSpeakers;

  return (
    <>
      <li
        className={
          "mx-auto flex max-w-[400px] list-none flex-col items-center justify-center overflow-hidden rounded-lg bg-[#FFEFED]  font-[Raleway] shadow-lg sm:w-full "
        }>
        <img className={"h-[136px] w-full object-cover"} src={eventImage} alt={eventTitle} />
        <div className=" w-full px-8 pt-4 ">
          <h3 className="text-2xl font-extrabold  text-[#272d67]">{eventTitle}</h3>

          <p className="mt-1 font-bold tracking-wide text-[#379392]">{eventDate}</p>
          {/* <p className="font-bold  text-[#272d67]">Led by {eventSpeakers.join(" and ")}</p> */}
          <p className="mt-1 font-bold text-[#272d67]">Led by {eventSpeakers}</p>

          <p className="mt-1 font-medium text-[#379392]">
            {"Background Details Lorem, ipsum dolor sit amet consectetur adipisicing elit."}
          </p>
        </div>

        <Button
          kind={"primary"}
          size={"md"}
          text={"Add to Cal"}
          className={"my-6 mx-4 w-[180px] font-[Raleway] text-2xl text-[#EFE2BA] "}
          isLoading={false}
        />
      </li>
    </>
  );
}
