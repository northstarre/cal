// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { useEffect } from "react";
import { NextPageContext } from "next";
import { getSession } from "@lib/auth";
import { inferSSRProps } from "@lib/types/inferSSRProps";
import { useRouter } from "next/router";
import prisma from "@lib/prisma";
import { useSession } from "next-auth/react";
import { HeadSeo } from "@components/seo/head-seo";
import { CheckIcon } from "@heroicons/react/outline";
import Button from "@components/ui/Button";
import { ArrowLeftIcon } from "@heroicons/react/solid";

export default function Homepage(props: inferSSRProps<typeof getServerSideProps>) {
  console.log(props);
  const router = useRouter();
  const query = router.query;
  const { data: session, status } = useSession();
  const loading = status === "loading";
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(
      `https://devmynorthstarre-api.azurewebsites.net/api/Payments/credits/add/${props.user.id}/${query.credits}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionName: "sirius" }),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log("Credits processed Successfully"));
  }, []);
  return (
    <div>
      <HeadSeo title={"Payment Confirmation | Northstarre"} description={"Payment Completed Successfully"} />
      <main className="mx-auto my-24 max-w-3xl">
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 my-4 transition-opacity sm:my-0" aria-hidden="true">
              <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
                &#8203;
              </span>
              <div
                className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-headline">
                      Your Payment has been processed successfully.
                    </h3>
                  </div>
                </div>
                <div className="mt-5 text-center sm:mt-6">
                  <div className="mt-5">
                    {!loading && session?.user && (
                      <Button data-testid="back-to-Homes" href="/home" EndIcon={ArrowLeftIcon}>
                        Back to home
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
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
