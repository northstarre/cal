/* eslint-disable */
//@ts-nocheck
import React, { useState, useEffect } from "react";
import Button from "../Button";

import { useForm } from "react-hook-form";
import { doGet, doPost, doPatch } from "../../pages/makeAPICall";

export default function Biography({ onIsEditComplete, profile }) {
  const [majors, setMajors] = useState([]);
  const [degrees, setDegrees] = useState(["Bachelors", "Masters", "High Shool Graduate", "Diploma"]);
  const [professions, setProfessions] = useState([]);
  const [Interests, setInterests] = useState([]);
  const [base64, setBase64] = useState("");
  const [file, setFile] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [years, setYears] = useState([]);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    doGet("majorsMeta", setMajors, () => {});
    doGet("PreProfessionalPrograms", setProfessions, () => {});
    doGet("Interests", setInterests, () => {});
    const date = new Date();
    const year = date.getFullYear();
    const pastyears = Array.from(new Array(5), (val, index) => year - index);
    const futureYears = Array.from(new Array(15), (val, index) => year + 1 + index);
    setYears([ ...pastyears.reverse(), ...futureYears]);
  }, []);
  useEffect(() => {
    if (file) {
      const data = new FormData();
      data.append("image", file);
      doPost(
        "waitList/toBase64",
        data,
        {},
        (resp) => {
          setBase64(resp);
          setIsLoading(false);
        },
        () => {
          alert("Unable to process your image. Please try again.");
          setIsLoading(false);
        }
      );
    }
  }, [file]);
  useEffect(() => {
    if (base64) {
      setValue("profilePhoto", base64);
    }
    setIsLoading(false);
  }, [base64]);
  const fileOnChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const onSubmit = (data) => {
    setIsLoading(true);
    doPatch(
      "userInfo/BasicProfile",
      JSON.stringify(data),
      { "Content-type": "application/json" },
      () => {
        alert("data Saved Successfully");
        setIsLoading(false);
        onIsEditComplete();
      },
      () => {}
    );
  };
  return (
    <div className=" my-5">
      <form className="mx-5 mt-5" onSubmit={handleSubmit(onSubmit)}>
        {profile.isMentor ? (
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
            {!profile.isMentor ? "Desired " : ""}Majors
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
            {!profile.isMentor ? "Desired " : ""}Pre professional track
          </label>
          <div className="w-2/3 rounded border-gray-200 py-2.5 px-3">
            <select
              className={`flex h-10 w-full items-center rounded  border border-gray-300 pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700`}
              {...register("PreProfessionalTrack")}>
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
              {...register("GraduationMonth")}>
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
              {...register("GraduationYear")}>
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
            <select
              className={`mr-4  flex  h-10 w-1/2 items-center rounded border border-gray-300  pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700 md:mr-10`}
              {...register("Interest1")}>
              <option selected disabled value>
                Interest 1
              </option>
              {Interests.map((item, idx) => (
                <option key={idx}>{item.name}</option>
              ))}
            </select>
            <select
              className={`flex  h-10 w-1/2 items-center rounded border  border-gray-300 pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700`}
              {...register("Interest2")}>
              <option selected disabled value>
                Interest 2
              </option>
              {Interests.map((item, idx) => (
                <option key={idx}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-9">
          <label htmlFor="email1" className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]"></label>
          <div className="flex w-2/3 flex-row rounded border-gray-200 py-2.5 px-3">
            <select
              className={`mr-4 flex h-10   w-1/2 max-w-xs  items-center rounded border border-gray-300  pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700 md:mr-10`}
              {...register("Interest3")}>
              <option selected disabled value>
                Interest 3
              </option>
              {Interests.map((item, idx) => (
                <option key={idx}>{item.name}</option>
              ))}
            </select>
            <select
              className={`flex h-10 w-1/2 max-w-xs items-center rounded border  border-gray-300 pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700`}
              {...register("Interest4")}>
              <option selected disabled value>
                Interest 4
              </option>
              {Interests.map((item, idx) => (
                <option key={idx}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-9">
          <label htmlFor="profilepic" className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]">
            Profile Photo
          </label>
          <div className="flex w-2/3 flex-row rounded border-gray-200 py-2.5 px-3">
            <input
              className=" flex h-10 w-full items-center  rounded border border-gray-700 border-gray-300 pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:border-indigo-700"
              aria-describedby="profilepic"
              id="profilePhoto"
              type="file"
              accept=".jpg, .png, .jpeg"
              onChange={fileOnChange}
            />
          </div>
        </div>

        <div className="mx-auto mt-8">
          <textarea
            placeholder="About"
            className="h-24 w-full resize-none overflow-y-auto rounded border border-gray-200 py-3 pl-3 shadow focus:border-indigo-700 dark:focus:border-indigo-700"
            defaultValue={""}
            {...register("about")}
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
