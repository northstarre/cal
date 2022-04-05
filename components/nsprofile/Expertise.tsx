/* eslint-disable */
//@ts-nocheck
import React, { useState, useEffect } from "react";
import Button from "../Button";

import { useForm } from "react-hook-form";
import { doGet, doPatch } from "../../makeAPICall";
import Select from "react-select";

export default function Expertise({ onIsEditComplete, profile, onEdit, expertise }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue
  } = useForm();

  useEffect(() => {
   reset({expertise1: profile.expertise[0],
     expertise2: profile.expertise[1],
     expertise3: profile.expertise[2],
     expertise4: profile.expertise[3],
     expertise5: profile.expertise[4],
     expertise6: profile.expertise[5],
     expertise7: profile.expertise[6],
     expertise8: profile.expertise[7],
   })
  }, []);

  const onSubmit = (data) => {
    setIsLoading(true);
    const list = [];
    if (data.expertise1) {
      list.push(data.expertise1)
    }
    if (data.expertise2) {
      list.push(data.expertise2)
    }
    if (data.expertise3) {
      list.push(data.expertise3)
    }
    if (data.expertise4) {
      list.push(data.expertise4)
    }
    if (data.expertise5) {
      list.push(data.expertise5)
    }
    if (data.expertise6) {
      list.push(data.expertise6)
    }
    if (data.expertise7) {
      list.push(data.expertise7)
    }
    if (data.expertise8) {
      list.push(data.expertise8)
    }
    onEdit({
      expertise: list,
    }, onIsEditComplete).then(data => setIsLoading(false) );
  };
  return (
    <div className=" my-5">
      <form className="mx-5 mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center space-x-9">
          <label htmlFor="email1" className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]">
            {profile.willGiveAdvice
              ? "Your Expertise"
              : "Your Goals"}
          </label>
          <div className="w-2/3 rounded border-gray-200 py-2.5 px-3">
            {console.log(profile.expertise[0])}
            <Select
              id={"expertise1"}
              isClearable
              options={expertise.map((itm: any) => ({ value: profile.willGiveAdvice ? itm.mentorText : itm.menteeText,
                label:  profile.willGiveAdvice ? itm.mentorText : itm.menteeText }))}
              defaultValue={{label:profile.expertise[0], value: profile.expertise[0]}}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500  sm:text-sm"
              onChange={(e: any) => {
                if (e) {
                  setValue("expertise1",e.value);
                }
                else {
                  setValue("expertise1",'');
                }
              }}
              placeholder={profile.willGiveAdvice ? "Select an Expertise": "Select a Goal"}
            />
          </div>
        </div>
        <div className="flex items-center space-x-9">
          <label htmlFor="email1" className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]"></label>
          <div className="w-2/3 rounded border-gray-200 py-2.5 px-3">
            <Select
              id={"expertise2"}
              isClearable
              options={expertise.map((itm: any) => ({ value: profile.willGiveAdvice ? itm.mentorText : itm.menteeText,
                label:  profile.willGiveAdvice ? itm.mentorText : itm.menteeText }))}
              defaultValue={{label:profile.expertise[1] ?? '', value: profile.expertise[1]?? ''}}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500  sm:text-sm"
              onChange={(e: any) => {
                if (e) {
                  setValue("expertise2",e.value);
                }
                else {
                  setValue("expertise2",'');
                }
              }}
              placeholder={profile.willGiveAdvice ? "Select an Expertise": "Select a Goal"}
            />
          </div>
        </div>
        <div className="flex items-center space-x-9">
          <label htmlFor="email1" className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]"></label>
          <div className="w-2/3 rounded border-gray-200 py-2.5 px-3">
            <Select
              id={"expertise3"}
              isClearable
              options={expertise.map((itm: any) => ({ value: profile.willGiveAdvice ? itm.mentorText : itm.menteeText,
                label:  profile.willGiveAdvice ? itm.mentorText : itm.menteeText }))}
              defaultValue={{label:profile.expertise[2] ?? '', value: profile.expertise[2]?? ''}}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500  sm:text-sm"
              onChange={(e: any) => {
                if (e) {
                  setValue("expertise3",e.value);
                }
                else {
                  setValue("expertise3",'');
                }
              }}
              placeholder={profile.willGiveAdvice ? "Select an Expertise": "Select a Goal"}
            />
          </div>
        </div>
        <div className="flex items-center space-x-9">
          <label className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]"></label>
          <div className="w-2/3 rounded border-gray-200 py-2.5 px-3">
            <Select
              id={"expertise4"}
              isClearable
              options={expertise.map((itm: any) => ({ value: profile.willGiveAdvice ? itm.mentorText : itm.menteeText,
                label:  profile.willGiveAdvice ? itm.mentorText : itm.menteeText }))}
              defaultValue={{label:profile.expertise[3] ?? '', value: profile.expertise[3]?? ''}}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500  sm:text-sm"
              onChange={(e: any) => {
                if (e) {
                  setValue("expertise4",e.value);
                }
                else {
                  setValue("expertise4",'');
                }
              }}
              placeholder={profile.willGiveAdvice ? "Select an Expertise": "Select a Goal"}
            />
          </div>
        </div>
        <div className="flex items-center space-x-9">
          <label className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]"></label>
          <div className="w-2/3 rounded border-gray-200 py-2.5 px-3">
            <Select
              id={"expertise5"}
              isClearable
              options={expertise.map((itm: any) => ({ value: profile.willGiveAdvice ? itm.mentorText : itm.menteeText,
                label:  profile.willGiveAdvice ? itm.mentorText : itm.menteeText }))}
              defaultValue={{label:profile.expertise[4] ?? '', value: profile.expertise[4]?? ''}}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500  sm:text-sm"
              onChange={(e: any) => {
                if (e) {
                  setValue("expertise5",e.value);
                }
                else {
                  setValue("expertise5",'');
                }
              }}
              placeholder={profile.willGiveAdvice ? "Select an Expertise": "Select a Goal"}
            />
          </div>
        </div>
        <div className="flex items-center space-x-9">
          <label className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]"></label>
          <div className="w-2/3 rounded border-gray-200 py-2.5 px-3">
            <Select
              id={"expertise6"}
              isClearable
              options={expertise.map((itm: any) => ({ value: profile.willGiveAdvice ? itm.mentorText : itm.menteeText,
                label:  profile.willGiveAdvice ? itm.mentorText : itm.menteeText }))}
              defaultValue={{label:profile.expertise[5] ?? '', value: profile.expertise[5]?? ''}}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500  sm:text-sm"
              onChange={(e: any) => {
                if (e) {
                  setValue("expertise6",e.value);
                }
                else {
                  setValue("expertise6",'');
                }
              }}
              placeholder={profile.willGiveAdvice ? "Select an Expertise": "Select a Goal"}
            />
          </div>
        </div>
        <div className="flex items-center space-x-9">
          <label className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]"></label>
          <div className="w-2/3 rounded border-gray-200 py-2.5 px-3">
            <Select
              id={"expertise7"}
              isClearable
              options={expertise.map((itm: any) => ({ value: profile.willGiveAdvice ? itm.mentorText : itm.menteeText,
                label:  profile.willGiveAdvice ? itm.mentorText : itm.menteeText }))}
              defaultValue={{label:profile.expertise[6] ?? '', value: profile.expertise[6]?? ''}}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500  sm:text-sm"
              onChange={(e: any) => {
                if (e) {
                  setValue("expertise7",e.value);
                }
                else {
                  setValue("expertise7",'');
                }
              }}
              placeholder={profile.willGiveAdvice ? "Select an Expertise": "Select a Goal"}
            />
          </div>
        </div>
        <div className="flex items-center space-x-9">
          <label className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]"></label>
          <div className="w-2/3 rounded border-gray-200 py-2.5 px-3">
            <Select
              id={"expertise8"}
              isClearable
              options={expertise.map((itm: any) => ({ value: profile.willGiveAdvice ? itm.mentorText : itm.menteeText,
                label:  profile.willGiveAdvice ? itm.mentorText : itm.menteeText }))}
              defaultValue={{label:profile.expertise[7] ?? '', value: profile.expertise[7]?? ''}}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500  sm:text-sm"
              onChange={(e: any) => {
                if (e) {
                  setValue("expertise8",e.value);
                }
                else {
                  setValue("expertise8",'');
                }
              }}
              placeholder={profile.willGiveAdvice ? "Select an Expertise": "Select a Goal"}
            />
          </div>
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
