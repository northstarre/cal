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
              <p className="mx-5 mt-6 w-full text-center text-base font-normal leading-6 text-gray-300 lg:w-10/12  xl:mt-3 xl:w-8/12">
                Northstarre’s mission is to democratize access to professional resources for students. We were
                founded with the the hope that any student around thd world with the passion to pursue a
                certain career path has the resources to achieve it, regardless of geography, network, income,
                or background.
              </p>
              <p className="mx-5 mt-3 text-center text-base font-normal leading-6 text-gray-300 lg:w-10/12 xl:w-8/12">
                We were built for the first-timers of families. The first doctors. The first lawyers. The
                first engineers. The first artists.
              </p>
              <p className="mx-5 mt-3 text-center text-base font-normal leading-6 text-gray-300 lg:w-10/12 xl:w-8/12">
                Northstarre is directly addressing information inequity by tapping on college and graduate
                students across the country to give back to students who were just like them a few years ago.
              </p>
              <p className="mx-5 mt-3 mb-6 text-center text-base font-bold leading-6 text-gray-300 lg:w-10/12 xl:mt-3 xl:w-8/12">
                We hope you join us.
              </p>
            </div>
          </div>
          <div>
            <img
              className="hidden h-full w-full rounded-md border xl:block"
              src="https://i.ibb.co/VCGbH9S/12.png"
              height="340px"
              alt="people discussing something"
            />
            <img
              className="hidden w-full rounded-md border sm:block lg:block xl:hidden"
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
              <p className="mt-6 w-full text-base font-normal leading-6 text-gray-600">
                My sister and I were born in India and moved to the United States when we were less than five
                years old. She’s only 18 months older me, and throughout our childhood, we did almost
                everything together. We played the same sports, took the same classes, and even had the same
                friends.{" "}
              </p>
              <br />{" "}
              <p className="mt-6 w-full text-base font-normal leading-6 text-gray-600">
                Although I chose to pursue a professional path similar to my parents, my sister has been
                carving her own path. And that path has led her to become the first doctor in our family.
              </p>{" "}
              <br />
              <p className="mt-6 w-full text-base font-normal leading-6 text-gray-600">
                Rewind the clock to our years in high school, and you’d see our entire family was in
                consistent and intense panic -- how do we support her?
              </p>{" "}
              <br />{" "}
              <p className="mt-6 w-full text-base font-normal leading-6 text-gray-600">
                We put her in expensive summer science camps, we applied to 20+ undergraduate programs, we
                applied to colleges with over five different declarations of majors, and we encouraged her to
                take gap years to really figure out how to build her roadmap.
              </p>
              <br />
              <p className="mt-6 w-full text-base font-normal leading-6 text-gray-600">
                {" "}
                This story might seem familiar to you if you’re the first in your family. Without the right
                resources and network, my sister was unable to avoid costly mistakes, grasp her financial
                outlook, and understand how to best make some of the most critical decisions in her life.{" "}
              </p>{" "}
              <br />{" "}
              <p className="mt-6 w-full text-base font-normal leading-6 text-gray-600">
                We’re all faced with decisions like these in high school: the expensive, really important ones
                that often have a reverberating impact in the years after college. But we often make these
                decisions alone. We lean on family and friends that we know, even if those resources are
                biased and limited and feel helpless trying to find a network that might help us with
                frameworks for better decision making. So most of us default to comfortable decisions -- we
                become what our parents are. We become what we’re exposed to because those decisions feel
                safe.{" "}
              </p>{" "}
              <br />{" "}
              <p className="mt-6 w-full text-base font-normal leading-6 text-gray-600">
                {" "}
                And I believe that this pattern of repeating behaviors unknowingly promotes inequality. Our
                own decision making in these early years fuelled by information inequity eventually creates
                income inequality..{" "}
              </p>{" "}
              <br />
              <p>With Northstarre, I hope to change that. </p> <br />
              Cheers,
              <br /> Malavica Sridhar <br /> Founder of Northstarre. <br />
              <p className="mt-6 w-full text-base font-normal leading-6 text-gray-600">
                We are always looking for feedback. If you want to drop a note to our team, feel free to do so
                at hello@mynorthstarre.com or give us a call at (630) 306-4136.
              </p>
            </div>
            <div className=" relative mt-8 w-full cursor-pointer sm:mt-10 lg:mt-0 lg:w-5/12">
              <img className="w-full" src="/assets/image%20111.png" alt="A women" />
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
