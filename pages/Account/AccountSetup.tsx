import React, { useEffect, useState } from "react";
import { doGet, doPut } from "../makeAPICall";
import { NextPageContext } from "next";
import { getSession } from "@lib/auth";
import prisma from "@lib/prisma";
import { inferSSRProps } from "@lib/types/inferSSRProps";

export default function AccountSetup(props: inferSSRProps<typeof getServerSideProps>) {
  useEffect(() => {
    doGet(
      `userInfo/account/setup-complete/${props.profile?.id}`,
      () => {},
      () => {}
    );
  }, [props.profile]);
  return (
    <div className={"flex flex-col items-center py-0 text-center font-[fira-sans] text-[#272D67] md:py-24 "}>
      <div className={"font-[fira-sans] text-3xl font-bold md:text-4xl lg:text-5xl"}>
        Your Account setup has been done
      </div>
    </div>
  );
}
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  const signedIn = session?.user?.id ?? false;
  const isBeta = null;
  let user = {};
  console.log("session user id", session?.user?.id);
  console.log("Home Session", session);
  console.log("SignedIn", signedIn);
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
  }
  return {
    props: {
      profile: user,
      isBeta,
      signedIn,
    },
  };
}
