import { useRouter } from "next/router";
import Navbar from "@components/Navbar";
import React from "react";
import { inferSSRProps } from "@lib/types/inferSSRProps";
import { NextPageContext } from "next";
import { getSession } from "@lib/auth";
import prisma from "@lib/prisma";

export default function Pricing(props: inferSSRProps<typeof getServerSideProps>) {
  const router = useRouter();
  return (
    <>
      <Navbar isBeta={false} signedIn={props.signedIn} profile={props.user} />
      <div className="mx-auto 2xl:container">
        <div
          className={"font-[Fira Sans] flex flex-col items-center py-0 text-center text-[#272D67] md:pt-0"}>
          <div
            className={
              "font-[Fira Sans] px-auto mx-0 flex min-h-[400px]  w-full items-center justify-center bg-[url('/assets/pricing-banner.jpg')] bg-cover bg-center text-3xl  font-bold text-white md:text-4xl lg:text-5xl"
            }>
            You’re one step away from finding your professional mentor...
            <br />
            or a whole lot of them
          </div>
          <div
            className={
              "mx-0 mt-5 flex w-full flex-col px-[20px] md:mt-10 md:flex-row md:px-[100px] lg:mt-12 lg:gap-x-2"
            }>
            <div className={"mb-10 flex w-full flex-col font-[Raleway] xl:w-1/3"}>
              <span className={"text-4xl font-normal"}>Astra</span>
              <div className={"my-10 min-h-[440px] rounded-[20px] border-2 border-[#272d67] py-4 px-2"}>
                <div
                  className={
                    "flex flex-col items-center rounded-[20px] bg-[#DADADA] p-4 text-center  font-[Raleway]"
                  }>
                  <span className={"text-4xl font-bold "}>1 Expert Call</span>
                  <span className={"mt-5 mb-1 text-2xl "}>This Month</span>
                </div>
                <div className={"mt-[40px] mb-[60px] flex flex-col items-center  text-center"}>
                  <span className={"mb-[40px] text-center text-5xl"}>$30.00</span>
                  <button
                    className={
                      "mb-[24px] min-h-[40px] min-w-[240px] rounded-full bg-[#379392] text-2xl font-bold text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                    }
                    onClick={() => router.push("/payment/CollectPayment/?subscriptionName=astra")}>
                    Buy Now
                  </button>
                  <span className={"hidden text-2xl italic"}>Billed Monthly</span>
                </div>
              </div>
              <div className={"flex flex-row items-center gap-x-[10px] py-2 px-2"}>
                <img src={"../image%2068.svg"} width={"40px"} height={"38px"} />
                <span className={"leading[23px] text-[19px] text-[#272D67]"}>
                  Introduce yourself to a coach
                </span>
              </div>
              <div className={"flex flex-row items-center gap-x-[10px] py-2 px-2"}>
                <img src={"../image%2068.svg"} width={"40px"} height={"38px"} />
                <span className={"leading[23px] text-[19px] text-[#272D67]"}>Get a specific perspective</span>
              </div>
              <div className={"flex flex-row items-center gap-x-[10px] py-2 px-2"}>
                <img src={"../image%2068.svg"} width={"40px"} height={"38px"} />
                <span className={"leading[23px] text-[19px] text-[#272D67]"}>
                  Get a 101 on a professional track
                </span>
              </div>
            </div>
            <div className={"mb-10 flex w-full flex-col font-[Raleway] xl:w-1/3"}>
              <span className={"text-4xl font-normal"}>Sirius</span>
              <div className={"my-10 min-h-[440px] rounded-[20px] border-2 border-[#272d67] py-4 px-2"}>
                <div
                  className={"flex flex-col items-center rounded-[20px] bg-[#DADADA] p-4 text-center"}>
                  <span className={"text-4xl font-bold"}>3 Expert Calls</span>
                  <span className={"mt-5 mb-1 text-2xl"}>This Month</span>
                </div>
                <div className={"mt-[40px] mb-[30px] flex flex-col items-center  text-center"}>
                  <span className={"mb-[40px] text-center text-5xl"}>$85.00</span>
                  <button
                    className={
                      "mb-[24px] min-h-[40px] min-w-[240px] rounded-full bg-[#379392] text-2xl font-bold text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                    }
                    onClick={() => router.push("/payment/CollectPayment/?subscriptionName=sirius")}>
                    Buy Now
                  </button>
                  <span className={"hidden text-2xl italic"}>Billed Monthly</span>
                </div>
                <div
                  className={"flex flex-col items-center rounded-[20px] bg-[#DADADA] py-3 px-0 text-center"}>
                  <span className={"text-2xl"}>Best Value</span>
                </div>
              </div>
              <div className={"flex flex-row items-center gap-x-[10px] py-2 px-2"}>
                <img src={"../image%2068.svg"} width={"40px"} height={"38px"} />
                <span className={"leading[23px] text-[19px] text-[#272D67]"}>
                  Get feedback on your dream schools
                </span>
              </div>
              <div className={"flex flex-row items-center gap-x-[10px] py-2 px-2"}>
                <img src={"../image%2068.svg"} width={"40px"} height={"38px"} />
                <span className={"leading[23px] text-[19px] text-[#272D67]"}>
                  Get advice on an upcoming decision
                </span>
              </div>
              <div className={"flex flex-row items-center gap-x-[10px] py-2 px-2"}>
                <img src={"../image%2068.svg"} width={"40px"} height={"38px"} />
                <span className={"leading[23px] text-[19px] text-[#272D67]"}>Get up to speed on a major</span>
              </div>
            </div>
            <div className={"mb-10 flex w-full flex-col font-[Raleway] xl:w-1/3"}>
              <span className={"text-4xl font-normal"}>Polaris</span>
              <div className={"my-10 min-h-[440px] rounded-[20px] border-2 border-[#272d67] py-4 px-2"}>
                <div
                  className={
                    "flex flex-col items-center rounded-[20px] bg-[#DADADA] p-4  text-center"
                  }>
                  <span className={"text-4xl font-bold"}>5 Expert Calls</span>
                  <span className={"mt-5 mb-1 text-2xl"}>This Month</span>
                </div>
                <div className={"mt-[40px] mb-[60px] flex flex-col items-center  text-center"}>
                  <span className={"mb-[40px] text-center text-5xl"}>$140.00</span>
                  <button
                    className={
                      "mb-[24px] min-h-[40px] min-w-[240px] rounded-full bg-[#379392] text-2xl font-bold text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                    }
                    onClick={() => router.push("/payment/CollectPayment/?subscriptionName=polaris")}>
                    Buy Now
                  </button>
                  <span className={"hidden text-2xl italic"}>Billed Monthly</span>
                </div>
              </div>
              <div className={"flex flex-row items-center gap-x-[10px] py-2 px-2"}>
                <img src={"../image%2068.svg"} width={"40px"} height={"38px"} />
                <span className={"leading[23px] text-[19px] text-[#272D67]"}>
                  Mix & match experts across schools
                </span>
              </div>
              <div className={"flex flex-row items-center gap-x-[10px] py-2 px-2"}>
                <img src={"../image%2068.svg"} width={"40px"} height={"38px"} />
                <span className={"leading[23px] text-[19px] text-[#272D67]"}>Laser focus on 1-2 schools</span>
              </div>
              <div className={"flex flex-row items-center gap-x-[10px] py-2 px-2"}>
                <img src={"../image%2068.svg"} width={"40px"} height={"38px"} />
                <span className={"leading[23px] text-[19px] text-[#272D67]"}>Get up to speed on a track</span>
              </div>
            </div>
          </div>
          <div className={"font-[Fira Sans] mt-16 mb-8 text-3xl font-bold md:text-4xl lg:text-5xl"}>
            Want to see more from us? Let us know.
          </div>
          <div className={"mx-0 mb-8 flex w-full flex-col px-[20px] font-[Raleway] text-3xl lg:text-4xl"}>
            I’m interested in...(select all that apply)
          </div>
          <form className={"md:px-68 flex flex-col self-center px-0 font-[Raleway]"}>
            <div className={"flex flex-row items-center gap-x-[8px] px-2"}>
              <input
                type="checkbox"
                id="feedback1"
                className={"h-[20px] w-[20px] border-0 bg-[#C4C4C4] md:h-[35px] md:w-[35px]"}
                value="Bike"
              />
              <span className={"text-[28px] font-normal text-[#272D67]"}>College 101 Series</span>
            </div>

            <div className={"mt-5 flex flex-row items-center gap-x-[8px] px-2"}>
              <input
                type="checkbox"
                id="feedback1"
                className={"h-[20px] w-[20px] border-0 bg-[#C4C4C4] md:h-[35px] md:w-[35px]"}
                value="Bike"
              />
              <span className={"text-[28px] font-normal text-[#272D67]"}>Career Exploration Series</span>
            </div>
            <div className={"items-left mt-5 flex flex-row gap-x-[8px] px-2 md:items-center"}>
              <input
                type="checkbox"
                id="feedback1"
                className={"h-[20px] w-[20px] border-0 bg-[#C4C4C4] md:h-[35px] md:w-[35px]"}
                value="Bike"
              />
              <span className={"text-[28px] font-normal text-[#272D67]"}>College Application Series </span>
            </div>
            <div className={" mt-5 flex flex-row items-center gap-x-[8px] px-2 text-left md:text-center"}>
              <input
                type="checkbox"
                id="feedback1"
                className={"h-[20px] w-[20px] border-0 bg-[#C4C4C4] md:h-[35px] md:w-[35px]"}
                value="Bike"
              />
              <span className={"text-[28px] font-normal text-[#272D67]"}>
                Colleges Around the Country Series
              </span>
            </div>
            <div className={"mt-5 flex flex-row items-center gap-x-[8px] px-2 text-left md:text-center"}>
              <input
                type="checkbox"
                id="feedback1"
                className={"h-[20px] w-[20px] border-0 bg-[#C4C4C4] md:h-[35px] md:w-[35px]"}
                value="Bike"
              />
              <span className={"text-[28px] font-normal text-[#272D67]"}>STEM Career Series</span>
            </div>
            <div className={"mt-5 flex flex-row items-center gap-x-[8px] px-2 font-[Raleway]"}>
              <input
                type="checkbox"
                id="feedback1"
                className={"h-[20px] w-[20px] border-0 bg-[#C4C4C4] md:h-[35px] md:w-[35px]"}
                value="Bike"
              />
              <span className={"text-[28px] font-normal text-[#272D67] "}>Mental Health Series</span>
            </div>
            <div className={"mt-10 flex flex-col items-center text-center font-[Raleway]"}>
              <span className={"text-[25px] leading-[30px] text-[#272D67]"}>
                We’ll let you know when these launch.
              </span>
              <input
                type={"email"}
                className={
                  "text-[20] mt-5 h-[36px] min-w-[424px] rounded-[5px] border-[2px] border-[#e0e0e0] "
                }
                placeholder={"Email"}
              />
              <input
                type={"submit"}
                className={
                  "mt-5 min-h-[40px] min-w-[166px] rounded-full bg-[#379392] text-2xl text-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                }
                value={"Submit"}
              />
            </div>
          </form>
        </div>
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
