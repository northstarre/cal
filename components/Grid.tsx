// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from "react";
import ProfileSnapshot from "./ProfileSnapshot";

export default function Grid({ rows, shouldDisplayMajor, shouldDisplaySchool }) {
  const createDisplayName = (fullName: string) => {
    const firstName = fullName.split(" ")[0];
    const lastName = fullName.split(" ")[1];
    return `${firstName} ${lastName.charAt(0).toUpperCase()}`;
  };
  return (
    <div className={"flex w-[100%]"}>
      {rows.map((itm) => (
        <>
          <div className={"align-start mt-6 flex flex-wrap justify-start md:flex-row"}>
            {itm?.map((prof) => (
              <ProfileSnapshot
                key={prof.Id}
                displayName={createDisplayName(prof.Name)}
                id={prof.Id}
                major={prof.major}
                schoolNickname={prof.university}
                shouldDisplayMajor={shouldDisplayMajor}
                shouldDisplaySchool={shouldDisplaySchool}
              />
            ))}
          </div>
        </>
      ))}
    </div>
  );
}
