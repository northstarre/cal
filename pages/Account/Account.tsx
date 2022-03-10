// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { useState, useEffect } from "react";
import { doGet, doPut } from "../../makeAPICall";
import { inferSSRProps } from "../../lib/types/inferSSRProps";
import { NextPageContext } from "next";
import { getSession } from "../../lib/auth";
import prisma from "../../lib/prisma";
import Shell from "@components/Shell";

export default function Account(props: inferSSRProps<typeof getServerSideProps>) {
  const [accountIfo, setAccountInfo] = useState(undefined);
  const [linkInfo, setLinkInfo] = useState(undefined);
  const [amount, setAmount] = useState("");
  useEffect(() => {
    doGet(`userInfo/account/${props.profile.id}`, setAccountInfo, () => {});
  }, [props.profile]);
  useEffect(() => {
    if (!accountIfo?.accountDetailsCollected) {
      doGet(`userInfo/account/setup/${props.profile.id}`, setLinkInfo, () => {});
    }
  }, [accountIfo]);
  const onSubmitInternal = () => {
    doPut(
      `userInfo/payout/${props.profile.id}`,
      JSON.stringify({ amount: parseFloat(amount) }),
      { "Content-type": "application/json" },
      () => {
        alert("Payout submitted Successfully");
      },
      () => {}
    );
  };
  return (
    <>
      <Shell heading={"Accounts"} subtitle={"Your Northstarre Activity."}>
        {props.profile && accountIfo && props.profile.willGiveAdvice && (
          <div className={"flex flex-col justify-center"}>
            <div
              className={
                "mx-0 mt-5 flex w-full flex-col px-[20px] md:mt-10 md:flex-row md:px-[100px] lg:mt-24 lg:gap-x-2"
              }>
              <div className={"mb-10 flex w-full flex-col xl:w-1/3"}>
                <div className={"mt-5 mb-2 rounded-[20px] border border-[#272d67] p-2"}>
                  <div className={"mt-[40px] mb-[60px] flex flex-col items-center  text-center"}>
                    <span className={"mb-[80px] text-center text-5xl"}>{accountIfo.completedBookings}</span>

                    <span className={"text-2xl italic"}>Completed bookings</span>
                  </div>
                </div>
              </div>
              <div className={"mb-10 flex w-full flex-col xl:w-1/3"}>
                <div className={"mt-5 mb-2 rounded-[20px] border border-[#272d67] p-2"}>
                  <div className={"mt-[40px] mb-[30px] flex flex-col items-center  text-center"}>
                    <span className={"mb-[80px] text-center text-5xl"}>{accountIfo.totalEarnings}</span>
                    <span className={"text-2xl italic"}>Total earned</span>
                  </div>
                </div>
              </div>
              <div className={"mb-10 flex w-full flex-col xl:w-1/3"}>
                <div className={"mt-5 mb-2 rounded-[20px] border border-[#272d67] p-2"}>
                  <div className={"mt-[40px] mb-[60px] flex flex-col items-center  text-center"}>
                    <span className={"mb-[80px] text-center text-5xl"}>{accountIfo.availableEarnings}</span>
                    <span className={"text-2xl italic"}>Available to cashout</span>
                  </div>
                </div>
              </div>
            </div>
            {linkInfo && !accountIfo.accountDetailsCollected && (
              <div className="mt-5 mb-[24px] min-h-[40px] min-w-[320px] rounded-full bg-[#379392] font-bold text-white">
                <a href={linkInfo.link}>Setup Banking Details</a>
              </div>
            )}
            {accountIfo.accountDetailsCollected && (
              <div className={"mt-10 flex flex-col items-center text-center"}>
                <span className={"text-2xl"}>Enter Amount To withdraw</span>
                <input
                  type={"text"}
                  className={"mt-5 min-w-[360px]"}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={"Amount"}
                />
                <input
                  type={"button"}
                  className={
                    "min-[240px] mt-5 mb-[24px] min-h-[40px] rounded-full bg-[#379392] font-bold text-white"
                  }
                  onClick={onSubmitInternal}
                  value={"With draw"}
                />
              </div>
            )}
          </div>
        )}
        {props.profile && props.profile.willGetAdvice && props.profile.credits && (
          <div className={"flex flex-col justify-center"}>
            <div
              className={
                "mx-0 mt-5 flex w-full flex-col px-[20px] md:mt-10 md:flex-row md:px-[100px] lg:mt-24 lg:gap-x-2"
              }>
              <div className={"mb-10 flex w-full flex-col xl:w-1/3"}>
                <div className={"mt-5 mb-2 rounded-[20px] border border-[#272d67] p-2"}>
                  <div className={"mt-[40px] mb-[60px] flex flex-col items-center  text-center"}>
                    <span className={"mb-[80px] text-center text-5xl"}>
                      {props.profile.credits.UsedCredits}
                    </span>

                    <span className={"text-2xl italic"}>Used Credits</span>
                  </div>
                </div>
              </div>
              <div className={"mb-10 flex w-full flex-col xl:w-1/3"}>
                <div className={"mt-5 mb-2 rounded-[20px] border border-[#272d67] p-2"}>
                  <div className={"mt-[40px] mb-[30px] flex flex-col items-center  text-center"}>
                    <span className={"mb-[80px] text-center text-5xl"}>
                      {props.profile.credits.activeCredits}
                    </span>
                    <span className={"text-2xl italic"}>Active Credits</span>
                  </div>
                </div>
              </div>
              <div className={"mb-10 flex w-full flex-col xl:w-1/3"}>
                <div className={"mt-5 mb-2 rounded-[20px] border border-[#272d67] p-2"}>
                  <div className={"mt-[40px] mb-[60px] flex flex-col items-center  text-center"}>
                    <span className={"mb-[80px] text-center text-5xl"}>
                      {props.profile.credits.expiredCredits}
                    </span>
                    <span className={"text-2xl italic"}>Expired Credits</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Shell>
    </>
  );
}
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  const signedIn = session?.user?.id ?? false;
  const isBeta = null;
  let user = {};
  let credits = {};
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
        credits: {
          select: {
            UsedCredits: true,
            expiredCredits: true,
            activeCredits: true,
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
