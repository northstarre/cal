/* eslint-disable */
//@ts-nocheck
import React, { useEffect, useState } from "react";
import { doGet } from "../../pages/makeAPICall";
import Profile from "./Profile";

export default function ProfileRead() {
  const [profileToDisplay, setProfile] = useState(undefined);
  const id = "e8443f32-92e9-439b-895b-a49cfae0ee81";
  useEffect(() => {
    doGet(`userInfo?$filter=userObjectId eq ${id}`, setProfile, () => {});
  }, [id]);

  return profileToDisplay ? (
    <Profile profile={profileToDisplay[0]} setShouldRefetch={() => {}} isReadOnly={true} />
  ) : (
    <></>
  );
}
