import { SelectorIcon } from "@heroicons/react/outline";
import {
  CalendarIcon,
  ArrowLeftIcon,
  ClockIcon,
  CogIcon,
  ExternalLinkIcon,
  LinkIcon,
  LogoutIcon,
  PuzzleIcon,
  MoonIcon,
  MapIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import LicenseBanner from "@ee/components/LicenseBanner";
import TrialBanner from "@ee/components/TrialBanner";
import HelpMenuItemDynamic from "@ee/lib/intercom/HelpMenuItemDynamic";

import classNames from "@lib/classNames";
import { shouldShowOnboarding } from "@lib/getting-started";
import { useLocale } from "@lib/hooks/useLocale";
import { collectPageParameters, telemetryEventTypes, useTelemetry } from "@lib/telemetry";
import { trpc } from "@lib/trpc";

import CustomBranding from "@components/CustomBranding";
import Loader from "@components/Loader";
import { HeadSeo } from "@components/seo/head-seo";
import Dropdown, {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/Dropdown";

import { useViewerI18n } from "./I18nLanguageHandler";
import Logo from "./Logo";
import Button from "./ui/Button";
import Navbar from "@components/Navbar";

export function useMeQuery() {
  const meQuery = trpc.useQuery(["viewer.me"], {
    retry(failureCount) {
      return failureCount > 3;
    },
  });

  return meQuery;
}

function useRedirectToLoginIfUnauthenticated() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.replace({
        pathname: "/auth/login",
        query: {
          callbackUrl: `${location.pathname}${location.search}`,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, session]);

  return {
    loading: loading && !session,
  };
}

function useRedirectToOnboardingIfNeeded() {
  const router = useRouter();
  const query = useMeQuery();
  const user = query.data;

  const [isRedirectingToOnboarding, setRedirecting] = useState(false);
  useEffect(() => {
    if (user && shouldShowOnboarding(user)) {
      setRedirecting(true);
    }
  }, [router, user]);
  useEffect(() => {
    if (isRedirectingToOnboarding) {
      router.replace({
        pathname: "/getting-started",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRedirectingToOnboarding]);
  return {
    isRedirectingToOnboarding,
  };
}

export function ShellSubHeading(props: {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={classNames("mb-3 block justify-between sm:flex", props.className)}>
      <div>
        <h2 className="flex content-center items-center space-x-2 text-base font-bold leading-6 text-gray-900 rtl:space-x-reverse">
          {props.title}
        </h2>
        {props.subtitle && <p className="text-sm text-neutral-500 ltr:mr-4">{props.subtitle}</p>}
      </div>
      {props.actions && <div className="flex-shrink-0">{props.actions}</div>}
    </div>
  );
}

export default function Shell(props: {
  centered?: boolean;
  title?: string;
  heading: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  CTA?: ReactNode;
  HeadingLeftIcon?: ReactNode;
  backPath?: string; // renders back button to specified path
  // use when content needs to expand with flex
  flexChildrenContainer?: boolean;
  isMentor?: boolean;
  user: object;
}) {
  const { t } = useLocale();
  const router = useRouter();
  const { loading } = useRedirectToLoginIfUnauthenticated();
  const { isRedirectingToOnboarding } = useRedirectToOnboardingIfNeeded();

  const telemetry = useTelemetry();

  const navigation = [
    {
      name: "Account",
      href: "/Account/Account",
      icon: UserCircleIcon,
      current: router.asPath.startsWith("/Account"),
    },
    {
      name: t("bookings"),
      href: "/bookings/upcoming",
      icon: CalendarIcon,
      current: router.asPath.startsWith("/bookings"),
    },
    {
      name: t("availability"),
      href: "/availability",
      icon: ClockIcon,
      current: router.asPath.startsWith("/availability"),
    },
    {
      name: t("integrations"),
      href: "/integrations",
      icon: PuzzleIcon,
      current: router.asPath.startsWith("/integrations"),
    },
    {
      name: "Manage Password",
      href: "/settings/security",
      icon: CogIcon,
      current: router.asPath.startsWith("/settings"),
    },
    {
      name: "Meeting Settings",
      href: "/settings/meetingy",
      icon: CalendarIcon,
      current: router.asPath.startsWith("/settings"),
    },
  ];
  const menteeNavigation = [
    {
      name: "Account",
      href: "/Account/Account",
      icon: UserCircleIcon,
      current: router.asPath.startsWith("/Account"),
    },
    {
      name: t("bookings"),
      href: "/bookings/upcoming",
      icon: CalendarIcon,
      current: router.asPath.startsWith("/bookings"),
    },
    {
      name: t("integrations"),
      href: "/integrations",
      icon: PuzzleIcon,
      current: router.asPath.startsWith("/integrations"),
    },
    {
      name: "Manage Password",
      href: "/settings/security",
      icon: CogIcon,
      current: router.asPath.startsWith("/settings"),
    },
  ];

  useEffect(() => {
    telemetry.withJitsu((jitsu) => {
      return jitsu.track(telemetryEventTypes.pageView, collectPageParameters(router.asPath));
    });
  }, [telemetry, router.asPath]);

  const pageTitle = typeof props.heading === "string" ? props.heading : props.title;

  const query = useMeQuery();
  const user = query.data;

  const i18n = useViewerI18n();
  const resolvedNav = user?.willGiveAdvice ? navigation : menteeNavigation;

  if (i18n.status === "loading" || isRedirectingToOnboarding || loading) {
    // show spinner whilst i18n is loading to avoid language flicker
    return (
      <div className="absolute z-50 flex h-screen w-full items-center bg-gray-50">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <HeadSeo
        title={pageTitle ?? "Northstarre-Account"}
        description={props.subtitle ? props.subtitle?.toString() : ""}
        nextSeoProps={{
          nofollow: true,
          noindex: true,
        }}
      />
      <div>
        <Toaster position="bottom-right" />
      </div>
      {user && <Navbar isBeta={false} signedIn={true} profile={user} />}
      <div className="flex h-screen overflow-hidden dark:bg-[#ffffff]" data-testid="dashboard-shell">
        <div className="hidden md:flex lg:flex-shrink-0">
          <div className="flex w-14 flex-col lg:w-60">
            <div className="flex h-0 flex-1 flex-col border-r border-gray-200 bg-white">
              <div className="flex flex-1 flex-col overflow-y-auto pt-3 pb-4 lg:pt-5">
                <nav className="mt-2 flex-1 space-y-1 bg-white px-2 lg:mt-5">
                  {resolvedNav.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={classNames(
                          item.current
                            ? "bg-neutral-100 text-neutral-900"
                            : "text-neutral-500 hover:bg-gray-50 hover:text-neutral-900",
                          "group flex items-center rounded-sm px-2 py-2 text-sm font-medium"
                        )}>
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-neutral-500"
                              : "text-neutral-400 group-hover:text-neutral-500",
                            "h-5 w-5 flex-shrink-0 ltr:mr-3 rtl:ml-3"
                          )}
                          aria-hidden="true"
                        />
                        <span className="hidden lg:inline">{item.name}</span>
                      </a>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-0 flex-1 flex-col overflow-hidden">
          <main
            className={classNames(
              "relative z-0 max-w-[1700px] flex-1 overflow-y-auto focus:outline-none",
              props.flexChildrenContainer && "flex flex-col"
            )}>
            {/* show top navigation for md and smaller (tablet and phones) */}
            <nav className="flex items-center justify-between border-b border-gray-200 bg-white p-4 md:hidden">
              <Link href="/account">
                <a>
                  <Logo />
                </a>
              </Link>
              <div className="flex items-center gap-3 self-center">
                <button className="rounded-full bg-white p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
                  <span className="sr-only">{t("view_notifications")}</span>
                  <Link href="/settings/profile">
                    <a>
                      <CogIcon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  </Link>
                </button>
                <UserDropdown small />
              </div>
            </nav>
            <div
              className={classNames(
                props.centered && "mx-auto md:max-w-5xl",
                props.flexChildrenContainer && "flex flex-1 flex-col",
                "py-8"
              )}>
              {!!props.backPath && (
                <div className="mx-3 mb-8 sm:mx-8">
                  <Button
                    onClick={() => router.push(props.backPath as string)}
                    StartIcon={ArrowLeftIcon}
                    color="secondary">
                    Back
                  </Button>
                </div>
              )}
              <div className="block min-h-[80px] justify-between px-4 sm:flex sm:px-6 md:px-8">
                {props.HeadingLeftIcon && <div className="ltr:mr-4">{props.HeadingLeftIcon}</div>}
                <div className="mb-8 w-full">
                  <h1 className="mb-1 font-cal text-xl font-bold tracking-wide text-gray-900">
                    {props.heading}
                  </h1>
                  <p className="text-sm text-neutral-500 ltr:mr-4 rtl:ml-4">{props.subtitle}</p>
                </div>
                <div className="mb-4 flex-shrink-0">{props.CTA}</div>
              </div>
              <div
                className={classNames(
                  "px-4 sm:px-6 md:px-8",
                  props.flexChildrenContainer && "flex flex-1 flex-col"
                )}>
                {props.children}
              </div>
              {/* show bottom navigation for md and smaller (tablet and phones) */}
              <nav className="bottom-nav fixed bottom-0 z-40 flex w-full bg-white shadow md:hidden">
                {/* note(PeerRich): using flatMap instead of map to remove settings from bottom nav */}
                {resolvedNav.flatMap((item, itemIdx) =>
                  item.href === "/settings/profile" ? (
                    []
                  ) : (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={classNames(
                          item.current ? "text-gray-900" : "text-neutral-400 hover:text-gray-700",
                          itemIdx === 0 ? "rounded-l-lg" : "",
                          itemIdx === resolvedNav.length - 1 ? "rounded-r-lg" : "",
                          "group relative min-w-0 flex-1 overflow-hidden bg-white py-2 px-2 text-center text-xs font-medium hover:bg-gray-50 focus:z-10 sm:text-sm"
                        )}
                        aria-current={item.current ? "page" : undefined}>
                        <item.icon
                          className={classNames(
                            item.current ? "text-gray-900" : "text-gray-400 group-hover:text-gray-500",
                            "mx-auto mb-1 block h-5 w-5 flex-shrink-0 text-center"
                          )}
                          aria-hidden="true"
                        />
                        <span className="truncate">{item.name}</span>
                      </a>
                    </Link>
                  )
                )}
              </nav>
              {/* add padding to content for mobile navigation*/}
              <div className="block pt-12 md:hidden" />
            </div>
            <LicenseBanner />
          </main>
        </div>
      </div>
    </>
  );
}

function UserDropdown({ small }: { small?: boolean }) {
  const { t } = useLocale();
  const query = useMeQuery();
  const user = query.data;
  const mutation = trpc.useMutation("viewer.away", {
    onSettled() {
      utils.invalidateQueries("viewer.me");
    },
  });
  const utils = trpc.useContext();

  return (
    <Dropdown>
      <DropdownMenuTrigger asChild>
        <div className="group flex w-full cursor-pointer appearance-none items-center">
          <span
            className={classNames(
              small ? "h-8 w-8" : "h-10 w-10",
              "relative flex-shrink-0 rounded-full bg-gray-300  ltr:mr-3 rtl:ml-3"
            )}>
            <img
              className="rounded-full"
              src={
                (process.env.NEXT_PUBLIC_APP_URL || process.env.BASE_URL) +
                "/" +
                user?.username +
                "/avatar.png"
              }
              alt={user?.username || "Nameless User"}
            />
            {!user?.away && (
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
            )}
            {user?.away && (
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-yellow-500"></div>
            )}
          </span>
          {!small && (
            <span className="flex flex-grow items-center truncate">
              <span className="flex-grow truncate text-sm">
                <span className="block truncate font-medium text-gray-900">
                  {user?.username || "Nameless User"}
                </span>
                <span className="block truncate font-normal text-neutral-500">
                  {user?.username ? `cal.com/${user.username}` : "No public page"}
                </span>
              </span>
              <SelectorIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <a
            onClick={() => {
              mutation.mutate({ away: !user?.away });
              utils.invalidateQueries("viewer.me");
            }}
            className="flex cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900">
            <MoonIcon
              className={classNames(
                user?.away
                  ? "text-purple-500 group-hover:text-purple-700"
                  : "text-gray-500 group-hover:text-gray-700",
                "h-5 w-5 flex-shrink-0 ltr:mr-3 rtl:ml-3"
              )}
              aria-hidden="true"
            />
            {user?.away ? t("set_as_free") : t("set_as_away")}
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="h-px bg-gray-200" />
        {user?.username && (
          <DropdownMenuItem>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${process.env.NEXT_PUBLIC_APP_URL}/${user.username}`}
              className="flex items-center px-4 py-2 text-sm text-gray-700">
              <ExternalLinkIcon className="h-5 w-5 text-gray-500 ltr:mr-3 rtl:ml-3" /> {t("view_public_page")}
            </a>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator className="h-px bg-gray-200" />
        <HelpMenuItemDynamic />
        <DropdownMenuSeparator className="h-px bg-gray-200" />
        <DropdownMenuItem>
          <a
            onClick={() => signOut({ callbackUrl: "/auth/logout" })}
            className="flex cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900">
            <LogoutIcon
              className={classNames(
                "text-gray-500 group-hover:text-gray-700",
                "h-5 w-5 flex-shrink-0 ltr:mr-3 rtl:ml-3"
              )}
              aria-hidden="true"
            />
            {t("sign_out")}
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </Dropdown>
  );
}
