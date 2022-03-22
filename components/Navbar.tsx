/* eslint-disable */
//@ts-nocheck
import React, { useState } from "react";
import Button from "./Button";
import MenuDropdown, { ProfileDropDown } from "./MenuDropdown";
import { useRouter } from "next/router";
import { getCsrfToken, signIn, signOut } from "next-auth/react";
import { ErrorCode } from "@lib/auth";
import { useLocale } from "@lib/hooks/useLocale";

export default function Navbar({ signedIn, isBeta, profile }) {
  const [sideBar, setsideBar] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useRouter();
  const { t } = useLocale();
  const errorMessages: { [key: string]: string } = {
    // [ErrorCode.SecondFactorRequired]: t("2fa_enabled_instructions"),
    [ErrorCode.IncorrectPassword]: `${t("incorrect_password")} ${t("please_try_again")}`,
    [ErrorCode.UserNotFound]: t("no_account_exists"),
    [ErrorCode.IncorrectTwoFactorCode]: `${t("incorrect_2fa_code")} ${t("please_try_again")}`,
    [ErrorCode.InternalServerError]: `${t("something_went_wrong")} ${t("please_try_again_and_contact_us")}`,
    [ErrorCode.ThirdPartyIdentityProviderEnabled]: t("account_created_with_identity_provider"),
  };

  const handleLogin = () => {
    navigate.push("/auth/login")
  };
  return (
    <>
      <div className="h-full w-full">
        <nav role="navigation" className="mx-auto hidden w-full bg-white md:block md:px-6 lg:px-4 pt-4">
          <div className="container  mx-auto flex h-20 items-center justify-between border-gray-200 bg-white md:items-stretch">
            <div className="flex h-full w-full items-center justify-between">
              <button
                onClick={() => navigate.push("/")}
                role="img"
                aria-label="logo"
                className="mr-10 flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2">
                <svg
                  width="181"
                  height="45"
                  viewBox="0 0 181 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink">
                  <rect width="44" height="37" fill="url(#pattern0)" />
                  <path
                    d="M49.094 20.56C51.534 20.56 53.444 21.31 54.824 22.81C56.204 24.29 56.894 26.37 56.894 29.05C56.894 30.75 56.574 32.24 55.934 33.52C55.314 34.78 54.414 35.76 53.234 36.46C52.074 37.16 50.694 37.51 49.094 37.51C46.674 37.51 44.764 36.77 43.364 35.29C41.984 33.79 41.294 31.7 41.294 29.02C41.294 27.32 41.604 25.84 42.224 24.58C42.864 23.3 43.764 22.31 44.924 21.61C46.104 20.91 47.494 20.56 49.094 20.56ZM49.094 24.04C48.134 24.04 47.414 24.45 46.934 25.27C46.454 26.07 46.214 27.32 46.214 29.02C46.214 30.76 46.444 32.03 46.904 32.83C47.384 33.63 48.114 34.03 49.094 34.03C50.054 34.03 50.774 33.63 51.254 32.83C51.734 32.01 51.974 30.75 51.974 29.05C51.974 27.31 51.734 26.04 51.254 25.24C50.794 24.44 50.074 24.04 49.094 24.04ZM68.3535 20.62C68.9335 20.62 69.4635 20.69 69.9435 20.83L69.1935 25.42C68.5935 25.28 68.1135 25.21 67.7535 25.21C66.8135 25.21 66.0935 25.54 65.5935 26.2C65.1135 26.84 64.7335 27.81 64.4535 29.11V37H59.7135V21.07H63.8535L64.2435 24.16C64.6035 23.06 65.1435 22.2 65.8635 21.58C66.6035 20.94 67.4335 20.62 68.3535 20.62ZM81.7445 36.25C81.1645 36.65 80.4845 36.96 79.7045 37.18C78.9445 37.4 78.1845 37.51 77.4245 37.51C73.9445 37.49 72.2045 35.57 72.2045 31.75V24.37H69.9545V21.07H72.2045V17.62L76.9445 17.08V21.07H80.6045L80.0945 24.37H76.9445V31.69C76.9445 32.43 77.0645 32.96 77.3045 33.28C77.5445 33.6 77.9245 33.76 78.4445 33.76C78.9845 33.76 79.5545 33.59 80.1545 33.25L81.7445 36.25ZM92.6568 20.56C94.0368 20.56 95.1168 20.98 95.8968 21.82C96.6768 22.66 97.0668 23.84 97.0668 25.36V37H92.3268V26.17C92.3268 25.37 92.1968 24.82 91.9368 24.52C91.6768 24.2 91.3068 24.04 90.8268 24.04C89.8668 24.04 88.9468 24.72 88.0668 26.08V37H83.3268V14.74L88.0668 14.26V22.78C88.7268 22.04 89.4268 21.49 90.1668 21.13C90.9068 20.75 91.7368 20.56 92.6568 20.56ZM106.251 20.56C107.391 20.56 108.461 20.73 109.461 21.07C110.461 21.41 111.341 21.89 112.101 22.51L110.361 25.18C109.061 24.36 107.751 23.95 106.431 23.95C105.811 23.95 105.331 24.06 104.991 24.28C104.671 24.48 104.511 24.77 104.511 25.15C104.511 25.45 104.581 25.7 104.721 25.9C104.881 26.08 105.191 26.27 105.651 26.47C106.111 26.67 106.821 26.91 107.781 27.19C109.441 27.67 110.671 28.3 111.471 29.08C112.291 29.84 112.701 30.9 112.701 32.26C112.701 33.34 112.391 34.28 111.771 35.08C111.151 35.86 110.301 36.46 109.221 36.88C108.141 37.3 106.941 37.51 105.621 37.51C104.281 37.51 103.031 37.3 101.871 36.88C100.731 36.46 99.7613 35.88 98.9613 35.14L101.271 32.56C102.611 33.6 104.021 34.12 105.501 34.12C106.221 34.12 106.781 33.99 107.181 33.73C107.601 33.47 107.811 33.1 107.811 32.62C107.811 32.24 107.731 31.94 107.571 31.72C107.411 31.5 107.101 31.3 106.641 31.12C106.181 30.92 105.451 30.68 104.451 30.4C102.871 29.94 101.691 29.3 100.911 28.48C100.131 27.66 99.7413 26.64 99.7413 25.42C99.7413 24.5 100.001 23.68 100.521 22.96C101.061 22.22 101.821 21.64 102.801 21.22C103.801 20.78 104.951 20.56 106.251 20.56ZM125.133 36.25C124.553 36.65 123.873 36.96 123.093 37.18C122.333 37.4 121.573 37.51 120.813 37.51C117.333 37.49 115.593 35.57 115.593 31.75V24.37H113.343V21.07H115.593V17.62L120.333 17.08V21.07H123.993L123.483 24.37H120.333V31.69C120.333 32.43 120.453 32.96 120.693 33.28C120.933 33.6 121.313 33.76 121.833 33.76C122.373 33.76 122.943 33.59 123.543 33.25L125.133 36.25ZM139.024 32.38C139.024 32.98 139.104 33.42 139.264 33.7C139.444 33.98 139.724 34.19 140.104 34.33L139.114 37.42C138.134 37.34 137.334 37.13 136.714 36.79C136.094 36.43 135.614 35.87 135.274 35.11C134.234 36.71 132.634 37.51 130.474 37.51C128.894 37.51 127.634 37.05 126.694 36.13C125.754 35.21 125.284 34.01 125.284 32.53C125.284 30.79 125.924 29.46 127.204 28.54C128.484 27.62 130.334 27.16 132.754 27.16H134.374V26.47C134.374 25.53 134.174 24.89 133.774 24.55C133.374 24.19 132.674 24.01 131.674 24.01C131.154 24.01 130.524 24.09 129.784 24.25C129.044 24.39 128.284 24.59 127.504 24.85L126.424 21.73C127.424 21.35 128.444 21.06 129.484 20.86C130.544 20.66 131.524 20.56 132.424 20.56C134.704 20.56 136.374 21.03 137.434 21.97C138.494 22.91 139.024 24.32 139.024 26.2V32.38ZM131.854 34.12C132.934 34.12 133.774 33.61 134.374 32.59V29.77H133.204C132.124 29.77 131.314 29.96 130.774 30.34C130.254 30.72 129.994 31.31 129.994 32.11C129.994 32.75 130.154 33.25 130.474 33.61C130.814 33.95 131.274 34.12 131.854 34.12ZM151.439 20.62C152.019 20.62 152.549 20.69 153.029 20.83L152.279 25.42C151.679 25.28 151.199 25.21 150.839 25.21C149.899 25.21 149.179 25.54 148.679 26.2C148.199 26.84 147.819 27.81 147.539 29.11V37H142.799V21.07H146.939L147.329 24.16C147.689 23.06 148.229 22.2 148.949 21.58C149.689 20.94 150.519 20.62 151.439 20.62ZM163.48 20.62C164.06 20.62 164.59 20.69 165.07 20.83L164.32 25.42C163.72 25.28 163.24 25.21 162.88 25.21C161.94 25.21 161.22 25.54 160.72 26.2C160.24 26.84 159.86 27.81 159.58 29.11V37H154.84V21.07H158.98L159.37 24.16C159.73 23.06 160.27 22.2 160.99 21.58C161.73 20.94 162.56 20.62 163.48 20.62ZM179.863 28.72C179.863 29.38 179.833 29.95 179.773 30.43H169.903C170.063 31.77 170.443 32.71 171.043 33.25C171.643 33.79 172.473 34.06 173.533 34.06C174.173 34.06 174.793 33.95 175.393 33.73C175.993 33.49 176.643 33.13 177.343 32.65L179.293 35.29C177.433 36.77 175.363 37.51 173.083 37.51C170.503 37.51 168.523 36.75 167.143 35.23C165.763 33.71 165.073 31.67 165.073 29.11C165.073 27.49 165.363 26.04 165.943 24.76C166.523 23.46 167.373 22.44 168.493 21.7C169.613 20.94 170.953 20.56 172.513 20.56C174.813 20.56 176.613 21.28 177.913 22.72C179.213 24.16 179.863 26.16 179.863 28.72ZM175.213 27.37C175.173 24.93 174.313 23.71 172.633 23.71C171.813 23.71 171.173 24.01 170.713 24.61C170.273 25.21 170.003 26.2 169.903 27.58H175.213V27.37Z"
                    fill="#272D67"
                  />
                  <defs>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use
                        xlinkHref="#image0_661_33463"
                        transform="translate(0 -0.153079) scale(0.00819672 0.00974745)"
                      />
                    </pattern>
                    <image
                      id="image0_661_33463"
                      width="122"
                      height="134"
                      xlinkHref="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
              </button>
              {!isBeta ? (
                <ul className="hidden h-full w-full items-center justify-center lg:pr-12 md:flex font-[Raleway]">
                  <li>
                    <MenuDropdown
                      text={"Get Advice"}
                      options={[
                        {
                          text: "Join Our Q&As",
                          onClick: () => {
                            navigate.push("/events");
                          },
                        },
                        { text: "Talk to a Mentor", onClick: () => navigate.push("/Mentee") },
                        {
                          text: "Pricing",
                          onClick: () => {
                            navigate.push("/payment/pricing");
                          },
                        },

                      ]}
                    />
                  </li>
                  <li>
                    <a
                      href="/Mentor"
                      className="text-[#272D67] mr-6 flex h-full cursor-pointer items-center border-b-2 border-transparent py-3 pl-3 text-base font-medium tracking-normal hover:text-indigo-700 focus:outline-none">
                      Give Advice
                    </a>
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>
            <div className="hidden items-center justify-end md:flex">
              <div className="flex items-center">
                {signedIn ? (
                  <>
                    <div className="flex h-full items-center">

                    </div>
                    <ProfileDropDown img={profile?.avatar} options={[
                        { text: "Profile", onClick: () => navigate.push("/settings/profile") },
                         {
                      text: "Account",
                      onClick: () => {
                      navigate.push("/Account/Account");
                    },
                    },
                      {text: "Sign Out", onClick: () => signOut({ callbackUrl: "/auth/logout" })}
                      ]}

                    />
                  </>
                ) : !isBeta ? (
                  <>
                    <div className="flex items-center">
                      <div
                        onClick={() => navigate.push("/auth/login")}
                        className="w-[60px] text-[#272D67] mr-1 flex cursor-pointer items-center border-b-2 border-transparent text-base font-medium tracking-normal hover:text-indigo-700 focus:outline-none font-[Raleway]">
                        Sign In
                      </div>
                      <Button
                        kind={"default"}
                        onClick={() => navigate.push("/auth/signupe")}
                        text={"Sign Up"}
                        size="md"
                        className={"signup-btn text-2xl text-[#EFE2BA] px-2 font-[Raleway]"}
                      />
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </nav>
        <nav className="md:hidden">
          <div className="fixed top-0 z-40 w-full bg-white">
            <div className="container mx-auto flex md:hidden">
              <div className="mx-4 flex w-full items-center items-stretch justify-between border-b border-gray-200 py-4">
                <div aria-label="logo" role="img" tabIndex={0} className="focus:outline-none">
                  <svg
                    width="44"
                    height="37"
                    viewBox="0 0 44 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink">
                    <rect width="44" height="37" fill="url(#pattern1)" />
                    <defs>
                      <pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use
                          xlinkHref="#image1_277_30277"
                          transform="translate(0 -0.153079) scale(0.00819672 0.00974745)"
                        />
                      </pattern>
                      <image
                        id="image1_277_30277"
                        width="122"
                        height="134"
                        xlinkHref="data:image/png;base64,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"
                      />
                    </defs>
                  </svg>
                </div>
                <div className="flex items-center justify-end md:hidden">
                  <div className="flex items-center">
                    {!isBeta ? (
                      signedIn ? (
                        <>
                          <div className="flex h-full items-center">

                          </div>
                          <div className="flex h-full items-center">
                            <button
                              aria-label="dropdown"
                              className="focus:text-[#272D67]-900 text-[#272D67]-800 hover:text-[#272D67]-900 relative mx-4 flex w-full cursor-pointer items-center justify-end border-b-2 border-transparent focus:border-gray-800 focus:outline-none">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={profile.avatar}
                                alt="profile pic"
                              />
                            </button>
                          </div>
                        </>
                      ) : (
                        <Button kind={"default"} text={"Sign Up"} className={"px-4 mr-4"} />
                      )
                    ) : (
                      ""
                    )}
                    {!isBeta ? (
                      <div className="flex h-full items-center">
                        <button
                          id="menu"
                          aria-label="open menu"
                          className="text-[#272D67]-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                          onClick={() => setsideBar(!sideBar)}>
                          <svg
                            width={30}
                            height={30}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M21 10H3"
                              stroke="#4B5563"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M21 6H3"
                              stroke="#4B5563"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M21 14H3"
                              stroke="#4B5563"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M21 18H3"
                              stroke="#4B5563"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Mobile responsive sidebar*/}
          <div
            className={
              sideBar
                ? "absolute z-40 h-full w-full translate-x-0 transform transition duration-700 sm:hidden"
                : "absolute z-40 h-full w-full -translate-x-full transform transition duration-700 sm:hidden"
            }
            id="mobile-nav">
            <div className="fixed top-0 z-40 h-full w-full flex-col  justify-between overflow-y-auto bg-white pb-4 shadow-lg transition duration-500 ease-in-out xl:hidden">
              <div className="h-full px-5">
                <div className="flex h-full w-full flex-col justify-between">
                  <div>
                    <div className="mt-6 flex w-full  justify-items-end">
                      <div className="float-right w-full border-b  border-gray-200 pb-8">
                        <button
                          aria-label="close menu"
                          className="float-right rounded-md pl-8 text-gray-800 focus:outline-none focus:ring-2"
                          onClick={() => setsideBar(!sideBar)}>
                          <svg
                            width={14}
                            height={14}
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M13 1L1 13"
                              stroke="#1F2937"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M1 1L13 13"
                              stroke="#1F2937"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <ul className>
                      <li>
                        <a className="cursor-pointer">
                          <div className="text-[#272D67]-800 pt-8">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <p
                                  tabIndex={0}
                                  className="text-[#272D67]-800 text-sm font-medium focus:outline-none cursor-pointer">
                                  Get Advice
                                </p>
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a className="cursor-pointer">
                          <div className="text-[#272D67]-800 pt-8">
                            <div className="flex items-center">
                              <p
                                tabIndex={0}
                                className="text-[#272D67]-800 text-sm font-medium focus:outline-none">
                                Give Advice
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
