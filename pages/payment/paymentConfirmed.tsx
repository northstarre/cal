// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { useEffect } from "react";
import { NextPageContext } from "next";
import { getSession } from "@lib/auth";
import { inferSSRProps } from "@lib/types/inferSSRProps";
import {useRouter} from "next/router";
import prisma from "@lib/prisma";

export default function Homepage(props: inferSSRProps<typeof getServerSideProps>) {
  console.log(props);
  const { query } = useRouter();
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`https://localhost:7236/api/Payments/credits/add/${props.user.id}/${query.credits}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscriptionName: "sirius" }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Credits processed Successfully"));
  }, []);
  return (
    <>
      <h2 className={"text-center"}> Successfully Added Credits to your account </h2>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
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
  }
  return {
    props: {
      user,
    },
  };
}
