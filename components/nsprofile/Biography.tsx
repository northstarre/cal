/* eslint-disable */
//@ts-nocheck
import React, { useState, useEffect } from "react";
import Button from "../Button";
import Avatar from "@components/ui/Avatar"
import { useForm } from "react-hook-form";
import { doGet, doPost, doPatch } from "../../makeAPICall";
import ImageUploader from "@components/ImageUploader";
import { useLocale } from "@lib/hooks/useLocale";
import Select from "react-select";

export default function Biography({ onIsEditComplete, profile, onEdit, avatarRef, onProfilePicEdit,
                                    majors, degrees, professions, interests, years  }) {

  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>(profile.avatar || "");
  const { register, handleSubmit, setValue, reset } = useForm();
  const { t } = useLocale();
  useEffect(() => {
    reset(profile)
  }, []);


  const onSubmit = (data) => {
    setIsLoading(true);
    onEdit({...data,avatar: imageSrc }, onIsEditComplete).then(data => setIsLoading(false) );

  };
  return (
    <div className=" my-5">
      <form className="mx-5 mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center space-x-9">
          <label htmlFor="homeTown" className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]">
            Hometown
          </label>
          <div className="w-2/3 rounded border-gray-200 py-2.5 px-3">
            <input
              className={`flex h-10 w-full items-center rounded  border border-gray-300 pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700`}
              {...register("homeTown")}
              placeholder={"Naperville, IL"}
              type="text">
            </input>
          </div>
        </div>
        <div className="flex items-center space-x-9">
          <label htmlFor="homeTown" className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]">
            Current Location
          </label>
          <div className="w-2/3 rounded border-gray-200 py-2.5 px-3">
            <input
              className={`flex h-10 w-full items-center rounded  border border-gray-300 pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700`}
              {...register("currentLocation")}
              placeholder={"San Francisco, CA"}
              type="text">
            </input>
          </div>
        </div>
        {profile.willGiveAdvice ? (
          <div className="flex items-center space-x-9">
            <label htmlFor="email1" className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]">
              Degree
            </label>
            <div className="w-2/3 rounded border-gray-200 py-2.5 px-3">
              <select
                className={`flex h-10 w-full items-center rounded  border border-gray-300 pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700`}
                {...register("degree", { required: true })}>
                <option selected disabled value>
                  Select a Degree
                </option>

                {degrees.map((item, idx) => (
                  <option key={idx}>{item}</option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="flex items-center space-x-9">
          <label htmlFor="email1" className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]">
            {!profile.willGiveAdvice ? "Desired " : ""}Majors
          </label>
          <div className="w-2/3 rounded border-gray-200 py-2.5 px-3">
            <select
              className={`flex h-10 w-full items-center rounded  border border-gray-300 pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700`}
              {...register("major", { required: true })}>
              <option selected disabled value>
                Select a Major
              </option>
              {majors.map((item, idx) => (
                <option key={idx}>{item.instnm}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-9">
          <label htmlFor="email1" className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]">
            {!profile.willGiveAdvice ? "Desired " : ""}Pre professional track
          </label>
          <div className="w-2/3 rounded border-gray-200 py-2.5 px-3">
            <select
              className={`flex h-10 w-full items-center rounded  border border-gray-300 pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700`}
              {...register("preProfessionalTrack")}>
              <option selected disabled value>
                Select a Track
              </option>

              {professions.map((item, idx) => (
                <option key={idx}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-9">
          <label htmlFor="email1" className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]">
            Graduation
          </label>
          <div className="flex w-2/3 flex-row  rounded border-gray-200 py-2.5 px-3">
            <select
              className={`mr-4 flex h-10  w-1/2 max-w-xs items-center rounded border border-gray-300   pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700 md:mr-10`}
              {...register("graduationMonth")}>
              <option selected disabled value>
                Month
              </option>
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                (item, idx) => (
                  <option key={idx}>{item}</option>
                )
              )}
            </select>
            <select
              className={`flex h-10 w-1/2 max-w-xs items-center rounded border  border-gray-300 pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700`}
              {...register("graduationYear")}>
              <option selected disabled value>
                Year
              </option>
              {years.map((item, idx) => (
                <option key={idx}>{item}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-9">
          <label htmlFor="email1" className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]">
            Interests
          </label>
          <div className="flex w-2/3 flex-row rounded border-gray-200 py-2.5 px-3">
            <Select
              defaultValue={[{value:profile.interest1, label:profile.interest1 },
                {value:profile.interest2, label:profile.interest2 },
                {value:profile.interest3, label:profile.interest3 },
                {value:profile.interest4, label:profile.interest4 }].map(itm => itm.value? itm: null)}
              id={"select interest"}
              isClearable
              isMulti
              options={interests.sort(itm => itm.name).map((item, idx) => (
                {label: item.name, value: item.name}
              ))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm"
              onChange={(e: any) => {
                if (e) {
                   if (e[0]) {
                     setValue("interest1", e[0].value)
                   }
                   else {
                     setValue("interest1", "")
                   }
                  if (e[1]) {
                    setValue("interest2", e[1].value)
                  }
                  else {
                      setValue("interest2", "")
                  }
                  if (e[2]) {
                    setValue("interest3", e[2].value)
                  }
                  else {
                    setValue("interest3", "")
                  }
                  if (e[3]) {
                    setValue("interest4", e[3].value)
                  }
                  else {
                    setValue("interest4", "")
                  }
                }
              }}
            />
          </div>
        </div>
        <div className="flex items-center space-x-9">
            <Avatar
              alt={profile.name || ""}
              className="relative h-10 w-10 rounded-full"
              gravatarFallbackMd5={profile.emailMd5}
              imageSrc={imageSrc}
            />
            <input
              ref={avatarRef}
              type="hidden"
              name="avatar"
              id="avatar"
              placeholder="URL"
              className="mt-1 block w-full rounded-sm border border-gray-300 px-3 py-2 shadow-sm focus:border-neutral-800 focus:outline-none focus:ring-neutral-800 sm:text-sm"
              defaultValue={imageSrc}
            />
            <div className="flex items-center px-5">
              <ImageUploader
                target="avatar"
                id="avatar-upload"
                buttonMsg={t("change_avatar")}
                handleAvatarChange={(newAvatar) => {
                  avatarRef.current.value = newAvatar;
                  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                    window.HTMLInputElement.prototype,
                    "value"
                  )?.set;
                  nativeInputValueSetter?.call(avatarRef.current, newAvatar);
                  const ev2 = new Event("input", { bubbles: true });
                  avatarRef.current.dispatchEvent(ev2);
                  onProfilePicEdit(ev2 as unknown as FormEvent<HTMLFormElement>);
                  setImageSrc(newAvatar);
                }}
                imageSrc={imageSrc}
              />
            </div>
        </div>

        <div className="mx-auto mt-8">
          <textarea
            placeholder="About"
            className="h-24 w-full resize-none overflow-y-auto rounded border border-gray-200 py-3 pl-3 shadow focus:border-indigo-700 dark:focus:border-indigo-700"
            defaultValue={""}
            {...register("bio")}
          />
        </div>
      </form>
      <div className="my-5 flex items-center justify-center">
        <Button
          kind={"primary"}
          className={"w-[230px]"}
          isLoading={isLoading}
          type={"submit"}
          text={"Save"}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
}
