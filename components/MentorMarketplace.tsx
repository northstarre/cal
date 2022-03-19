// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { useState, useEffect } from "react";
import { doGet } from "../makeAPICall";
import Grid from "./Grid";
import unique from "lodash.uniqby";
import buildQuery from "odata-query";
import Loader from "@components/Loader";

// To start, populate with mentors from the waitlist
function getUniversityShorthand(str) {
  const firstLetters = str
    .replace("of", "")
    .split(" ")
    .map((word) => word[0])
    .join("");

  return firstLetters;
}

export default function MentorMarketplace({ size, heading, subText }) {
  const [majors, setMajors] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [fetchedMentors, setFetchedMentors] = useState([]);
  const [selectedMajor, setSlectedMajor] = useState("");
  const [query, setQuery] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const top = 30;
  const select = [
    "id",
    "name",
    "email",
    "majorshortcode",
    "university",
    "major",
    "unishortcode",
    "preprofessionTrack",
  ];
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    doGet("WaitListView?$select=major", onMajorsFetch, () => {});
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    doGet("WaitListView?$select=university", onUniversitiesFetch, () => {});
    setQuery(buildQuery({ top, select }));
  }, []);
  useEffect(() => {
    if (query) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      doGet(`WaitListView${query}`, setFetchedMentors, () => {});
    }
  }, [query]);
  useEffect(() => {
    onMentorsFetch(fetchedMentors);
  }, [fetchedMentors, size]);
  useEffect(() => {
    const filter = [];
    if (selectedMajor && selectedUniversity) {
      filter.push({ Major: selectedMajor }, { University: selectedUniversity });
    } else if (selectedUniversity) {
      filter.push({ University: selectedUniversity });
    } else if (selectedMajor) {
      filter.push({ Major: selectedMajor });
    }
    setQuery(buildQuery({ top, select, filter }));
  }, [selectedMajor, selectedUniversity]);

  const onMajorsFetch = (data) => {
    const unqMajors = unique(data, "Major");
    setMajors(unqMajors);
  };
  const onUniversitiesFetch = (data) => {
    const unqUniversities = unique(data, "University");
    setUniversities(unqUniversities);
  };
  const onMentorsFetch = (data) => {
    const remainingData = [...data];
    const rows = [];
    const defaultSize = size.width < 400 ? 3 : size.width < 700 ? 4 : 6;
    while (remainingData.length >= 1) {
      const newRowbkp = remainingData.splice(0, defaultSize);
      const newRow = newRowbkp.map((itm) => {
        return {
          ...itm,
          university: itm.UniShortCode ?? itm.University,
          major: itm.MajorShortCode ?? itm.Major,
        };
      });
      rows.push(newRow);
    }
    setMentors(rows);
  };
  return (
    <>
      <div id={"marketplace"} className={"my-8 w-full px-0 md:px-12 lg:px-24"}>
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="why-header text-[50px] font-bold leading-[60px] text-[#272d67]">{heading}</h2>
          {subText ? (
            <p className="w-11/12 text-center text-base leading-normal text-gray-600">{subText}</p>
          ) : (
            ""
          )}
        </div>
        <div className={"flex w-full flex-col gap-4 md:grid md:grid-cols-5"}>
          <div className={"col-span-1 flex flex-col"}>
            <span className={"text-base font-bold uppercase text-[#272D67]"}>{"Filter"}</span>
            <div className={"flex flex-row md:flex-col"}>
              <div className="mx-2 mt-[18px] flex w-full flex-col md:mr-16">
                <label
                  htmlFor="University"
                  className="mb-2  text-sm font-bold leading-tight tracking-normal text-gray-800">
                  University
                </label>
                <select
                  className={`flex h-10 w-full items-center rounded  border border-gray-300 pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700`}
                  onChange={(e) => {
                    setSelectedUniversity(e.target.value);
                  }}>
                  <option value=""></option>

                  {universities.map((item, idx) => (
                    <option key={idx}>{item.University}</option>
                  ))}
                </select>
              </div>
              <div className="mx-2 mt-[18px] flex w-full flex-col md:mr-16">
                <label
                  htmlFor="University"
                  className="mb-2  text-sm font-bold leading-tight tracking-normal text-gray-800">
                  Major
                </label>
                <select
                  className={`flex h-10 w-full items-center rounded  border border-gray-300 pl-3 text-sm shadow focus:border focus:border-indigo-700 focus:outline-none dark:border-gray-700 dark:focus:border-indigo-700`}
                  onChange={(e) => {
                    setSlectedMajor(e.target.value);
                  }}>
                  <option value=""></option>

                  {majors.map((item, idx) => (
                    <option key={idx}>{item.Major}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className={"col-span-4 flex flex-col"}>
            {mentors.length ? (
              <Grid rows={mentors} shouldDisplaySchool={true} shouldDisplayMajor={true} />
            ) : (
              <Loader className={"loader"} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
