// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useState, useEffect } from "react";
import Button from "./Button";

export default function EventFilter({ activeType, setActiveType, setFilteredEvents, events, value }) {
  useEffect(() => {
    if (activeType == "all") {
      setFilteredEvents(events);
      return;
    }
    const filtered = events.filter((event) => event.eventType == activeType);
    setFilteredEvents(filtered);
    // console.log("filtered", filtered);
  }, [activeType]);

  return (
    <button
      onClick={() => setActiveType(value)}
      className={`event__filterbtncontainer py-1 px-3 ${activeType == value ? "rounded-full border-2 border-[#818997]" : ""
        }`}>
      {value}
    </button>
  );
}
