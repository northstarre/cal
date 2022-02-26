// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from "react";
import ProfileSnapshot from "./ProfileSnapshot";

export default function Grid({ rows, shouldDisplayMajor, shouldDisplaySchool }) {
  return (
    <div>
      {rows.map((itm) => (
        <>
          <div className={"mt-6 flex flex-row gap-y-6 gap-x-4 md:gap-y-4 md:gap-x-12 xl:gap-y-0"}>
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
