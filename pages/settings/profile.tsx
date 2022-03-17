import crypto from "crypto";
import { GetServerSidePropsContext } from "next";
import { ComponentProps, FormEvent, useEffect, useRef, useState } from "react";
import { QueryCell } from "@lib/QueryCell";
import { getSession } from "@lib/auth";
import { useLocale } from "@lib/hooks/useLocale";
import showToast from "@lib/notification";
import prisma from "@lib/prisma";
import { trpc } from "@lib/trpc";
import { inferSSRProps } from "@lib/types/inferSSRProps";
import ProfileComponent from "@components/nsprofile/Profile";
import { Alert } from "@components/ui/Alert";
import { Prisma } from "@prisma/client";
import Navbar from "@components/Navbar";

type Props = inferSSRProps<typeof getServerSideProps>;

function SettingsView(props: ComponentProps<typeof Settings> & { localeProp: string }) {
  const utils = trpc.useContext();
  const { t } = useLocale();
  const updateUser = async (data: Prisma.UserUpdateInput, onEditComplete: any) => {
    const res = await fetch(`/api/user/${props.user.id}`, {
      method: "PATCH",
      body: JSON.stringify({ data: { ...data } }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      setHasErrors(true);
      setErrorMessage((await res.json()).message);
      document?.getElementsByTagName("main")[0]?.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      showToast(t("your_user_profile_updated_successfully"), "success");
      setHasErrors(false); // dismiss any open errors
      await utils.invalidateQueries(["viewer.me"]);
    }
    const responseData = await res.json();
    onEditComplete();
    return responseData.data;
  };
  const mutation = trpc.useMutation("viewer.updateProfile", {
    onSuccess: async () => {
      showToast(t("your_user_profile_updated_successfully"), "success");
      setHasErrors(false); // dismiss any open errors
      await utils.invalidateQueries(["viewer.me"]);
    },
    onError: (err) => {
      setHasErrors(true);
      setErrorMessage(err.message);
      document?.getElementsByTagName("main")[0]?.scrollTo({ top: 0, behavior: "smooth" });
    },
    async onSettled() {
      await utils.invalidateQueries(["viewer.i18n"]);
    },
  });

  const themeOptions = [
    { value: "light", label: t("light") },
    { value: "dark", label: t("dark") },
  ];

  const avatarRef = useRef<HTMLInputElement>(null!);

  const [hasErrors, setHasErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!props.user.theme) return;
    const userTheme = themeOptions.find((theme) => theme.value === props.user.theme);
    if (!userTheme) return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function updateProfileHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const enteredAvatar = avatarRef.current.value;
    mutation.mutate({
      avatar: enteredAvatar,
    });
  }

  return (
    <>
      {hasErrors && <Alert severity="error" title={errorMessage} />}
      <ProfileComponent
        updateProfile={updateUser}
        profile={props.user}
        avatarRef={avatarRef}
        isReadOnly={false}
        majors={props.majors}
        interests={props.interests}
        professions={props.professions}
        years={props.years}
        onProfilePicEdit={updateProfileHandler}
        degrees={props.degrees}
        loggedInUser={undefined}
        goals={props.goals}
      />
    </>
  );
}

export default function Settings(props: Props) {
  const query = trpc.useQuery(["viewer.i18n"]);

  return (
    <>
      <Navbar signedIn={true} profile={props.user} isBeta={false} />
      <QueryCell query={query} success={({ data }) => <SettingsView {...props} localeProp={data.locale} />} />
    </>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);

  if (!session?.user?.id) {
    return { redirect: { permanent: false, destination: "/auth/login" } };
  }

  let majors: string[] = [];
  const majorsResp = await fetch(`https://devmynorthstarre-api.azurewebsites.net/api/majorsMeta`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (majorsResp.ok) {
    majors = await majorsResp.json();
  }
  let professions: string[] = [];
  const professionsResp = await fetch(
    `https://devmynorthstarre-api.azurewebsites.net/api/PreProfessionalPrograms`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (professionsResp.ok) {
    professions = await professionsResp.json();
  }

  let interests: string[] = [];
  const interestsResp = await fetch(`https://devmynorthstarre-api.azurewebsites.net/api/Interests`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (interestsResp.ok) {
    interests = await interestsResp.json();
  }
  let goals: string[] = [];
  const goalsResp = await fetch(`https://devmynorthstarre-api.azurewebsites.net/api/goals`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (interestsResp.ok) {
    goals = await goalsResp.json();
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      bio: true,
      avatar: true,
      timeZone: true,
      weekStart: true,
      hideBranding: true,
      theme: true,
      plan: true,
      brandColor: true,
      metadata: true,
      startTime: true,
      endTime: true,
      completedOnboarding: true,
      willGiveAdvice: true,
      willGetAdvice: true,
      preProfessionalTrack: true,
      school: true,
      schoolYear: true,
      zipCode: true,
      describer: true,
      interest1: true,
      interest2: true,
      interest3: true,
      interest4: true,
      expertise: true,
      graduationYear: true,
      graduationMonth: true,
      major: true,
      degree: true,
      homeTown: true,
      currentLocation: true,
    },
  });

  if (!user) {
    throw new Error("User seems logged in but cannot be found in the db");
  }
  const date = new Date();
  const year = date.getFullYear();
  const pastyears = Array.from(new Array(5), (val, index) => year - index);
  const futureYears = Array.from(new Array(15), (val, index) => year + 1 + index);
  const years = [...pastyears.reverse(), ...futureYears];

  return {
    props: {
      user: {
        ...user,
        emailMd5: crypto.createHash("md5").update(user.email).digest("hex"),
      },
      majors,
      professions,
      interests,
      years,
      goals,
      degrees: ["Bachelors", "Masters", "High Shool Graduate", "Diploma"],
    },
  };
};
