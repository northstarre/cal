import React from "react";

import Loader from "@components/Loader";
import { HeadSeo } from "@components/seo/head-seo";

interface Props {
  title: string;
  description: string;
  footerText?: React.ReactNode | string;
  showLogo?: boolean;
  heading?: string;
  loading?: boolean;
}

export default function AuthContainer(props: React.PropsWithChildren<Props>) {
  return (
    <>
      <section className="h-screen bg-white">
        <HeadSeo title={props.title} description={props.description} />
        <div className="mx-auto flex h-full flex-col lg:flex-row lg:justify-center">
          <div className="relative flex w-full flex-col items-center justify-center py-20 sm:py-40 lg:w-1/2">
            <img src="/assets/rectangle%2076.png" className="w-full rounded-3xl" />
          </div>
          <div id="loginContainer" className="flex w-full justify-center bg-white lg:w-1/2">
            <div className="flex w-full flex-col justify-center px-2 py-16 text-gray-800 dark:text-gray-100 sm:w-4/6 sm:px-0 md:w-3/6 lg:w-2/3">
              <div className="px-2 sm:px-6">
                <h3 className="text-2xl font-bold leading-tight text-[#272d67] sm:text-3xl md:text-2xl">
                  Sign In To Your Northstarre Account
                </h3>
              </div>
              {props.loading && (
                <div className="absolute z-50 flex h-screen w-full items-center bg-gray-50">
                  <Loader />
                </div>
              )}
              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="mx-2 rounded-sm border border-neutral-200 bg-white px-4 py-8 sm:px-10">
                  {props.children}
                </div>
                <div className="mt-4 text-center text-sm text-neutral-600">{props.footerText}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
