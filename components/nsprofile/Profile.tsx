/* eslint-disable */
//@ts-nocheck
import React, { useState } from "react";
import CallIcon from "./CallIcon";
import PencilIcon from "../PencilIcon";
import ProfileListContent from "./ProfileListContent";
import Biography from "./Biography";
import Modal from "../Modal";
import Expertise from "./Expertise";
import { useRouter } from "next/router";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline"
import Link from "next/link";

export default function Index({ loggedInUser, profile: user, isReadOnly, updateProfile, avatarRef,onProfilePicEdit, majors, degrees, professions, interests, years, goals  }) {
  const [showBioGraphy, setShowBiography] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const navigate = useRouter();
  return (
    <>
      <main className="profile-page lg:px-60">
        <section className="relative block rounded-[20px]" style={{ height: "500px" }}>
          <div
            className="absolute top-0 h-full w-full rounded-[20px] bg-cover bg-center"
            style={{
              backgroundImage: "url('/assets/image%2051.png')",
              backgroundSize: "cover",
            }}></div>
          <div
            className="pointer-events-none absolute top-auto bottom-0 left-0 right-0 w-full overflow-hidden"
            style={{ height: "70px" }}></div>
        </section>
        <section className="relative pt-16">
          <div className="container px-4">
            <div className="relative mb-6 -mt-80 flex w-full min-w-0 flex-col break-words rounded-lg bg-[#FFF6DB] bg-white shadow-xl">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                    <div className="relative ">
                      <img
                        alt="..."
                        src={`${user?.avatar ?? ""}`}
                        className="absolute -m-16  -ml-20 h-auto rounded-full border-8 border-none border-[#FFF6DB] align-middle shadow-xl lg:-ml-16"
                        style={{ maxWidth: "168px", maxHeight: "162px" }}
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 lg:order-3 lg:w-4/12 lg:self-center lg:text-right">
                    {!isReadOnly ? (
                      <div
                        className="float-right mt-32 py-6 px-3 sm:mt-0"
                        onClick={() => setShowBiography(true)}>
                        <PencilIcon />
                      </div>
                    ) : (
                      <>
                        <div></div>
                      </>
                    )}
                  </div>
                  <div className="w-full px-4 lg:order-1 lg:w-4/12">
                    <div className="flex justify-center py-4 pt-8 lg:pt-4">
                      <div className="mr-4 p-3 text-center">
                        <span className="block flex flex-row text-3xl font-bold uppercase tracking-wide text-gray-700">
                          2 <CallIcon />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center ">
                  <h3 className="font-800 mb-2 mb-2 text-4xl font-semibold leading-normal text-[#272d67]">
                    {user.name}
                  </h3>
                  <div>
                    <div className={"flex flex-row w-full justify-between"}>
                      <h4 className={"font-600 text-left self-left text-3xl font-semibold text-[#272d67] "}>About</h4>
                      <div className={"self-right float-right justify-self-end flex flex-col text-center"}>
                        <button className={"bg-[#60ab67] rounded-full font-bold text-white text-center w-[180px] p-2 "} onClick={(e)=> {
                          if(loggedInUser && loggedInUser.id !== user.id){
                            navigate.replace(`/${user.username}`)
                          }
                          else {
                            if(user.willGiveAdvice) {
                              navigate.replace(`/availability`)
                            }
                            else {
                              navigate.replace('/Mentee')
                            }
                          }
                        }}>{loggedInUser && loggedInUser.id !== user.id ? "Book": user.willGiveAdvice ? "Edit Availability": "Book 1:1 mentor"} </button>
                        {!user.willGiveAdvice && <Link href="/QNA">
                          <a className="text-base font-medium font-indigo-600 underline hover:text-gray-500 p-x-2 flex flex-row">
                            {"help me find a mentor"}<QuestionMarkCircleIcon   height={"20px"} width={"20px"} />
                          </a>
                        </Link>}

                      </div>

                    </div>
                    <p className="text-md font-400 mb-4 text-left leading-relaxed font-[20px] min-h-[280px] text-[#272d67]">
                      {user.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={"grid grid-cols-1 md:grid-cols-2"}>
          <ProfileListContent
            header={"Biography"}
            isEditable={!isReadOnly}
            className={"mx-4 shadow-xl"}
            items={[
              { image: "/assets/Profile/text-bgcolor.png", value: user.school },
              { image: "/assets/Profile/Union.png", value: user.currentLocation },
              { image: "/assets/Profile/icon.png", value: user.homeTown },
              { image: "/assets/Profile/pencil-create.png", value: user.major },
              { image: "/assets/Profile/pencil-create.png", value: user.preProfessionalTrack },
              { image: "/assets/Profile/calculator.png", value: user.schoolYear },
              { image: "/assets/Profile/case.png", value: user.graduationYear },
              {
                image: "/assets/Profile/dribbble.png",
                value: `${user.interest1}, ${user.interest2}, ${user.interest3}, ${user.interest4}`,
              },
            ]}
            onEditClick={() => setShowBiography(true)}
          />
          <ProfileListContent
            header={user.willGiveAdvice? "Expertise Areas" : "Key Goals"}
            isEditable={!isReadOnly}
            className={"mx-4 shadow-xl"}
            items={
              user?.expertise?.map((itm) => {
                return { image: "/assets/Profile/check-mark.png", value: itm };
              }) ?? []
            }
            onEditClick={() => setShowChoices(true)}
          />
        </section>
        <section className={"pt-20"}>
          <div className="container">
            <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-[#FFF6DB] shadow-xl"></div>
          </div>
        </section>
      </main>
      <Modal isOpen={showBioGraphy} handlePopUp={(d) => setShowBiography(d)} header={"Update Biography"}>
        <Biography
          onIsEditComplete={() => {
            setShowBiography(false);
            navigate.reload(window.location.pathname);
          }}
          profile={user}
          onEdit={updateProfile}
          avatarRef={avatarRef}
          onProfilePicEdit = {onProfilePicEdit}
          majors={majors}
          years={years}
          professions={professions}
          degrees={degrees}
          interests={interests}
        />
      </Modal>
      <Modal isOpen={showChoices} handlePopUp={(d) => setShowChoices(d)} header={user.willGiveAdvice? "Expertise Areas" : "Key Goals"}>
        <Expertise
          onIsEditComplete={() => {
            setShowChoices(false);
            navigate.reload(window.location.pathname);
          }}
          profile={user}
          onEdit={updateProfile}
          expertise={goals}
        />
      </Modal>
    </>
  );
}
