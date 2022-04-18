import React from "react";
import { NextPageContext } from "next";
import { getSession } from "@lib/auth";
import prisma from "@lib/prisma";
import { inferSSRProps } from "@lib/types/inferSSRProps";
import Navbar from "@components/Navbar";

const About4 = (props: inferSSRProps<typeof getServerSideProps>) => {
  return (
    <>
      <Navbar isBeta={false} signedIn={props.signedIn} profile={props.user} />
      <div className="py-9 px-4 md:py-12 md:px-6 lg:py-16 lg:px-20 2xl:container 2xl:mx-auto">
        <div className="relative">
          <div className="absolute top-0 left-0 h-full w-full">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-md border bg-gray-800 bg-opacity-70 px-6 text-white sm:px-12">
              <h2 className="text-3xl font-bold leading-7 lg:text-4xl lg:leading-9">All About Us</h2>
              <p className="mx-auto mt-6 text-center text-base font-normal leading-6 text-gray-300 lg:w-8/12 xl:w-6/12">
                It is a long established fact that a reader will be distracted by the readable content of a
                page when looking at its layout. The point of using Lorem Ipsum.In the first place we have
                grante d to God, and by this our present charter confirmed for us and our heirs forever that
                the English Church shall be free, and shall have her rights entire,
              </p>
            </div>
          </div>
          <div>
            <img
              className="hidden w-full rounded-md border lg:block"
              src="https://i.ibb.co/VCGbH9S/12.png"
              alt="people discussing something"
            />
            <img
              className="hidden w-full rounded-md border sm:block lg:hidden"
              src="https://i.ibb.co/2yvrWVN/Rectangle-122-1.png"
              alt="people discussing something"
            />
            <img
              className="block w-full rounded-md border sm:hidden"
              src="https://i.ibb.co/sWmx8k6/Rectangle-122.png"
              alt="people discussing something"
            />
          </div>
        </div>

        <div className="mt-14 sm:mt-7 lg:mt-14">
          <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row">
            <div className="w-full lg:w-7/12 ">
              <h2 className="text-3xl font-bold leading-7 text-gray-800 lg:text-4xl lg:leading-9">
                Our Story
              </h2>
              <p className="mt-6 w-full text-base font-normal leading-6 text-gray-600 xl:w-9/12">
                It is a long established fact that a reader will be distracted by the readable content of a
                page when looking at its layout. The point of using Lorem Ipsum.In the first place we have
                granted to God, and by this our present charter confirmed for us and our heirs forever that
                the English Church shall be free, and shall have her rights entire, and her liberties
                inviolate; and we will that it be thus observed; which is apparent from
              </p>
              <p className="mt-10 w-full text-base font-normal leading-6 text-gray-600 xl:w-9/12">
                It is a long established fact that a reader will be distracted by the readable content of a
                page when looking at its layout. The point of using Lorem Ipsum.In the first place we have
                granted to God, and by this our present charter confirmed for us and our heirs forever that
                the English Church shall be free, and shall have her rights entire, and her liberties
                inviolate; and we will that it be thus observed; which is apparent from
              </p>

              <p className="mt-8 cursor-pointer text-xl font-normal leading-5 text-indigo-700 underline duration-100 hover:text-indigo-700 lg:mt-10">
                Watch the video
              </p>
            </div>
            <div className=" relative mt-8 w-full cursor-pointer sm:mt-10 lg:mt-0 lg:w-5/12">
              <img
                className="hidden w-full lg:block"
                src="https://i.ibb.co/NS8JynL/pexels-artem-podrez-8518616-1.png"
                alt="A women"
              />
              <img
                className="hidden w-full sm:block lg:hidden"
                src="https://i.ibb.co/M7c9tFs/Group-807.png"
                alt="A women"
              />
              <img
                className="block w-full sm:hidden"
                src="https://i.ibb.co/0rBHNLk/pexels-artem-podrez-8518616-1.png"
                alt="A women"
              />
              <div className="absolute top-0 left-0 p-4">
                <svg
                  width="72"
                  height="48"
                  viewBox="0 0 72 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <rect width="72" height="48" rx="6" fill="#4338CA" />
                  <path
                    d="M31 16V32L44 24L31 16Z"
                    fill="white"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About4;

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
  }
  return {
    props: {
      user,
      isBeta,
      signedIn,
    },
  };
}
