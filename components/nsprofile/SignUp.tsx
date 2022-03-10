/* eslint-disable */
//@ts-nocheck
import React, { useState, useEffect } from "react";
import Button from "../Button";
import ToggleButton from "../ToggleButton";

import { useForm } from "react-hook-form";
import { doGet, doPut, doPost } from "../../makeAPICall";
import { useRouter } from "next/router";

function sortHash(property) {
  const sortOrder = 1;
  return function (a, b) {
    const result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

export default function SignUp({ objectId, onSubmit }) {
  const [universities, setUniversities] = useState([]);
  const [base64, setBase64] = useState("");
  const [file, setFile] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isMentor, setIsMentor] = useState(false);
  const [isMentee, setIsMentee] = useState(false);

  const [step, setStep] = useState(1);
  const [describers, setDescribers] = useState([
    "High School student",
    "College Student (2 year or 4 year)",
    "Graduate School student",
    "Working Professional",
  ]);
  const [schoolYears, setSchoolYear] = useState(["Freshmen", "Sophomore", "Junior", "Senior"]);
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();
  const router = useRouter();
  useEffect(() => {
    doGet("universities", setUniversities, () => {
    });
    setValue("objectId", objectId);
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
  useEffect(() => {
    setValue("willGiveAdvice", isMentor);
  }, [isMentor]);
  useEffect(() => {
    setValue("willGetAdvice", isMentor);
  }, [isMentee]);
  const fileOnChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const onSubmitInternal = (data) => {
    setIsLoading(true);
    doPut(
      "userInfo/SignUp",
      JSON.stringify(data),
      { "Content-type": "application/json" },
      () => {
        alert("Data Saved Successfully");
        setIsLoading(false);
        router.push("/profile");
        onSubmit(true);
      },
      () => {
      }
    );
  };
  return (
    <div className=" my-5">
      <form className="mx-5 mt-5" onSubmit={handleSubmit(onSubmitInternal)}>
        {step === 1 ? (
          <>
            <div className="flex items-center space-x-9">
              <label htmlFor="firstName" className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]">
                First Name
              </label>
              <div className="flex w-2/3 flex-row rounded border-gray-200 py-2.5 px-3">
                <input
                  className=" flex h-10 w-full items-center  rounded border border-gray-700 border-gray-300 pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:border-indigo-700"
                  aria-describedby="firstName"
                  id="FirstName"
                  {...register("firstName", { required: true })}
                />
              </div>
            </div>
            <div className="flex items-center space-x-9">
              <label htmlFor="lastName" className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]">
                Last Name
              </label>
              <div className="flex w-2/3 flex-row rounded border-gray-200 py-2.5 px-3">
                <input
                  className=" flex h-10 w-full items-center  rounded border border-gray-700 border-gray-300 pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:border-indigo-700"
                  aria-describedby="laseName"
                  id="LastName"
                  {...register("lastName", { required: true })}
                />
              </div>
            </div>
            <div className="flex items-center space-x-9">
              <label htmlFor="zipCode" className="w-1/3 py-3   px-3 text-sm leading-none text-[#272d67]">
                Zip Code
              </label>
              <div className="flex w-2/3 flex-row rounded border-gray-200 py-2.5 px-3">
                <input
                  className=" flex h-10 w-full items-center  rounded border border-gray-700 border-gray-300 pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:border-indigo-700"
                  aria-describedby="zipCode"
                  id="ZipCode"
                  {...register("zipCode", { required: true })}
                />
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
          </>
        ) : (
          ""
        )}
        {step === 2 ? (
          <>
            <div className="flex flex-col items-center space-x-9">
              <label htmlFor="NorthStarreRole" className="w-full text-sm leading-none text-[#272d67]">
                What can Nortstarre do for you?
              </label>
              <div className="my-10 flex w-full flex-row">
                <ToggleButton
                  kind={"default"}
                  onClick={(isActive) => {
                    setIsMentor(isActive);
                  }}
                  type={"button"}
                  size={"md"}
                  className="mx-4 w-1/3 rounded-[5px] "
                  text={"Give Advice"}
                />
                <ToggleButton
                  kind={"default"}
                  onClick={(isActive) => {
                    setIsMentee(isActive);
                  }}
                  type={"button"}
                  size={"md"}
                  className="mx-4 w-1/3 rounded-[5px]"
                  text={"Get Advice"}
                />
                <ToggleButton
                  kind={"default"}
                  onClick={(isActive) => {
                    setIsMentor(isActive);
                    setIsMentee(isActive);
                  }}
                  type={"button"}
                  size={"md"}
                  disabled={isMentor || isMentee}
                  className="mx-4 w-1/3 rounded-[5px]"
                  text={"Both"}
                />
              </div>
            </div>
            <div className="flex flex-col items-center space-x-9">
              <label htmlFor="describer" className="w-full text-sm leading-none text-[#272d67]">
                Wich of the following describes you?
              </label>
              <div className="flex w-full flex-row">
                <select
                  className={`mt-4 mr-4 flex  h-10 w-1/2 max-w-xs items-center rounded border border-gray-300   pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700 md:mr-10`}
                  {...register("describer")}>
                  <option selected disabled value>
                    select 1
                  </option>
                  {describers.map((item, idx) => (
                    <option key={idx}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {step === 3 ? (
          <>
            <div className="flex flex-col items-center space-x-9">
              <label className="w-full text-sm leading-none text-[#272d67]">What school do you go to?</label>
              <div className="mb-10 flex w-full flex-row">
                <select
                  className={`mt-4  mr-4  flex h-10 max-w-xs items-center rounded border border-gray-300   pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700 md:mr-10`}
                  {...register("school")}>
                  <option selected disabled value>
                    select school
                  </option>
                  {universities.sort(sortHash("instnm")).map((item, idx) => (
                    <option key={idx}>{item.instnm}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col items-center space-x-9">
              <label className="w-full text-sm leading-none text-[#272d67]">
                What year in school are you?
              </label>
              <div className="flex w-full flex-row items-center">
                <select
                  className={`mt-4  mr-4  flex h-10 w-2/3 max-w-xs items-center rounded border border-gray-300   pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700 md:mr-10`}
                  {...register("schoolYear")}>
                  <option selected disabled value>
                    select year
                  </option>
                  {schoolYears.map((item, idx) => (
                    <option key={idx}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </form>
      {step === 3 ? (
        <div className="my-5 flex items-center justify-center">
          <Button
            kind={"primary"}
            className={"w-[230px]"}
            isLoading={isLoading}
            type={"submit"}
            text={"Save"}
            onClick={handleSubmit(onSubmitInternal)}
          />
        </div>
      ) : (
        ""
      )}
      {step < 3 ? (
        <div className="my-5 mx-8 flex items-end justify-end">
          <Button
            kind={"default"}
            className={"ml-4 w-[150px]"}
            isLoading={isLoading}
            text={"Next"}
            onClick={() => setStep(step + 1)}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
