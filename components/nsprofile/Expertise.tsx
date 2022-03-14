/* eslint-disable */
//@ts-nocheck
import React, { useState, useEffect } from "react";
import Button from "../Button";

import { useForm } from "react-hook-form";
import { doGet, doPatch } from "../../makeAPICall";

export default function Expertise({ onIsEditComplete, profile, onEdit }) {
  const [expertise, setExpertise] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    doGet("goals", setExpertise, () => {
    });
  }, []);

  const onSubmit = (data) => {
    setIsLoading(true);
    const list = [
      data.expertise1,
      data.expertise2,
      data.expertise3,
      data.expertise4,
      data.expertise5,
      data.expertise6,
      data.expertise7,
      data.expertise8,
    ];
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
            <select
              className={`flex h-10 w-full items-center rounded  border border-gray-300 pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700`}
              {...register("expertise1", { required: true })}>
              <option selected disabled value>
                {profile.willGiveAdvice ? "Select an Expertise": "Select a Goal" }
              </option>

              {expertise.map((item, idx) => (
                <option key={idx}>{profile.willGiveAdvice ? item.mentorText : item.menteeText}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-9">
          <label htmlFor="email1" className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]"></label>
          <div className="w-2/3 rounded border-gray-200 py-2.5 px-3">
            <select
              className={`flex h-10 w-full items-center rounded  border border-gray-300 pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700`}
              {...register("expertise2", { required: true })}>
              <option selected disabled value>
                {profile.willGiveAdvice ? "Select an Expertise": "Select a Goal" }
              </option>
              {expertise.map((item, idx) => (
                <option key={idx}>{profile.willGiveAdvice ? item.mentorText : item.menteeText}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-9">
          <label htmlFor="email1" className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]"></label>
          <div className="w-2/3 rounded border-gray-200 py-2.5 px-3">
            <select
              className={`flex h-10 w-full items-center rounded  border border-gray-300 pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700`}
              {...register("expertise3")}>
              <option selected disabled value>
                {profile.willGiveAdvice ? "Select an Expertise": "Select a Goal" }
              </option>
              {expertise.map((item, idx) => (
                <option key={idx}>{profile.willGiveAdvice ? item.mentorText : item.menteeText}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-9">
          <label className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]"></label>
          <div className="w-2/3 rounded border-gray-200 py-2.5 px-3">
            <select
              className={`flex h-10 w-full items-center rounded  border border-gray-300 pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700`}
              {...register("expertise4")}>
              <option selected disabled value>
                {profile.willGiveAdvice ? "Select an Expertise": "Select a Goal" }
              </option>
              {expertise.map((item, idx) => (
                <option key={idx}>{profile.willGiveAdvice ? item.mentorText : item.menteeText}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-9">
          <label className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]"></label>
          <div className="w-2/3 rounded border-gray-200 py-2.5 px-3">
            <select
              className={`flex h-10 w-full items-center rounded  border border-gray-300 pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700`}
              {...register("expertise5")}>
              <option selected disabled value>
                {profile.willGiveAdvice ? "Select an Expertise": "Select a Goal" }
              </option>
              {expertise.map((item, idx) => (
                <option key={idx}>{profile.willGiveAdvice ? item.mentorText : item.menteeText}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-9">
          <label className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]"></label>
          <div className="w-2/3 rounded border-gray-200 py-2.5 px-3">
            <select
              className={`flex h-10 w-full items-center rounded  border border-gray-300 pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700`}
              {...register("expertise6")}>
              <option selected disabled value>
                {profile.willGiveAdvice ? "Select an Expertise": "Select a Goal" }
              </option>
              {expertise.map((item, idx) => (
                <option key={idx}>{profile.willGiveAdvice ? item.mentorText : item.menteeText}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-9">
          <label className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]"></label>
          <div className="w-2/3 rounded border-gray-200 py-2.5 px-3">
            <select
              className={`flex h-10 w-full items-center rounded  border border-gray-300 pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700`}
              {...register("expertise7")}>
              <option selected disabled value>
                {profile.willGiveAdvice ? "Select an Expertise": "Select a Goal" }
              </option>
              {expertise.map((item, idx) => (
                <option key={idx}>{profile.willGiveAdvice ? item.mentorText : item.menteeText}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-9">
          <label className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]"></label>
          <div className="w-2/3 rounded border-gray-200 py-2.5 px-3">
            <select
              className={`flex h-10 w-full items-center rounded  border border-gray-300 pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700`}
              {...register("expertise8")}>
              <option selected disabled value>
                {profile.willGiveAdvice ? "Select an Expertise": "Select a Goal" }
              </option>
              {expertise.map((item, idx) => (
                <option key={idx}>{profile.willGiveAdvice ? item.mentorText : item.menteeText}</option>
              ))}
            </select>
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
