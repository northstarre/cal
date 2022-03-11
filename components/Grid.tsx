// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from "react";
import ProfileSnapshot from "./ProfileSnapshot";

export default function Grid({ rows, shouldDisplayMajor, shouldDisplaySchool }) {
  return (
    <div className={"w-[100%]"}>
      {rows.map((itm) => (
        <>
          <div className={"mt-6 flex flex-row align-start justify-start"}>
            {itm?.map((prof) => (
              <ProfileSnapshot
                displayName={prof.Name}
                id={prof.Id}
                major={prof.Major}
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
