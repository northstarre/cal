// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import Button from "./Button";

export default function Event({ event }) {
  // console.log(event);
  const { eventImage, eventName, eventDay, eventTime, eventSpeaker1, eventSpeaker2, speakerBackground } =
    event;

  return (
    <>
      <li
        className={
          "mx-auto mb-5 flex max-w-[400px] list-none flex-col items-center justify-center overflow-hidden rounded-lg bg-[#FFEFED]  font-[Raleway] shadow-lg sm:w-full "
        }>
        {/* <img className={"h-[136px] w-full object-cover"} src={`./assets/${eventImage}`} alt={eventName} /> */}
        <img
          className={"h-[136px] w-full object-cover"}
          src={`https://picsum.photos/400/600`}
          alt={eventName}
        />
        <div className=" h-full w-full px-8 pt-4">
          <h3 className="text-2xl font-extrabold  text-[#272d67]">{eventName}</h3>

          <p className="mt-1 font-bold tracking-wide text-[#379392]">
            {eventDay}
            {eventDay && eventTime ? ` and ${eventTime}` : ""}
          </p>
          {/* <p className="font-bold  text-[#272d67]">Led by {eventSpeaker1.join(" and ")}</p> */}
          <p className="mt-1 font-bold text-[#272d67]">
            Led by {eventSpeaker1}
            {eventSpeaker1 ? ` Led by ${eventSpeaker1}` : ""}
            {eventSpeaker2 && eventSpeaker1 ? ` and ${eventSpeaker2}` : ""}
          </p>

          <p className="mt-1 font-medium text-[#379392]">Speaker Background: {speakerBackground}</p>
        </div>

        <Button
          kind={"primary"}
          size={"md"}
          text={"Add to Cal"}
          className={"my-6 mx-4 w-[180px] py-5 font-[Raleway] text-2xl leading-[0] text-[#EFE2BA] "}
          isLoading={false}
        />
      </li>
    </>
  );
}
