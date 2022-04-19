// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import Button from "./Button";
import { doPost } from "../makeAPICall";
import showToast from "@lib/notification";
import toast, { Toaster } from "react-hot-toast";
import React from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Event({ event, user }) {
  const { id, image, name, day, time, speakers, speakerInfo, startTime } = event;
  const navigate = useRouter();

  return (
    <>
      <li
        className={
          "mx-auto mb-5 flex max-w-[400px] list-none flex-col items-center justify-center overflow-hidden rounded-lg bg-[#FFEFED]  font-[Raleway] shadow-lg sm:w-full "
        }>
        <img className={"h-[136px] w-full object-cover"} src={`/assets/${image}`} alt={name} />
        <div className="h-[155px] w-full px-8 pt-4">
          <h3 className="text-2xl font-extrabold  text-[#272d67]">{name}</h3>

          <p className="mt-1 font-bold tracking-wide text-[#379392]">
            {day && time ? dayjs(startTime).utc(true).tz(dayjs.tz.guess()).format("MM/dd/yyyy") : ""}
            {day && time ? ` AT ${dayjs(startTime).utc(true).tz(dayjs.tz.guess()).format("hh:mm a")}` : ""}
          </p>
          <p className="mt-1 font-bold text-[#272d67]">
            Led by {speakers[0]}
            {speakers[1] ? ` and ${speakers[1]}` : ""}
          </p>

          <p className="mt-1 font-medium text-[#379392]">{speakerInfo}</p>
        </div>
        <Toaster containerClassName={"abosolute top-[30px]"} />
        <Button
          kind={"primary"}
          size={"md"}
          text={"Add to Cal"}
          className={"my-6 mx-4 w-[180px] py-5 font-[Raleway] text-2xl leading-[0] text-[#FFFFFF] "}
          isLoading={false}
          onClick={() => {
            if (!user.id) {
              navigate.push("/auth/login");
            }
            doPost(
              `events/add/${id}/${user.email}`,
              {},
              {},
              () => {
                toast.success("Calendar invite sent successfully", {
                  duration: 6000,
                  style: {
                    borderRadius: "2px",
                    background: "#333",
                    color: "#fff",
                    boxShadow: "none",
                  },
                });
              },
              () => {
                toast.error("Failed to add calendar", {
                  duration: 6000,
                  style: {
                    borderRadius: "2px",
                    background: "#FEE2E2",
                    color: "#B91C1C",
                    boxShadow: "none",
                  },
                });
              }
            );
          }}
        />
      </li>
    </>
  );
}
