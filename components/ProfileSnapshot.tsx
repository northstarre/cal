// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import Button from "./Button";
import { doGet } from "../pages/makeAPICall";

export default function ProfileSnapshot({
  displayName,
  schoolNickname,
  major,
  id,
  shouldDisplaySchool,
  shouldDisplayMajor,
}) {
  const [profile, setprofilePic] = useState([
    {
      Profile:
        "iVBORw0KGgoAAAANSUhEUgAAAlgAAAGQCAYAAAByNR6YAAAAAXNSR0IArs4c6QAAE9xJREFUeF7t1jENADAMBLGGP7VwaqViuNEB8IOV4WZ373EECBAgQIAAAQKZwAiszNIQAQIECBAgQOALCCyPQIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECAssPECBAgAABAgRiAYEVg5ojQIAAAQIECAgsP0CAAAECBAgQiAUEVgxqjgABAgQIECAgsPwAAQIECBAgQCAWEFgxqDkCBAgQIECAgMDyAwQIECBAgACBWEBgxaDmCBAgQIAAAQICyw8QIECAAAECBGIBgRWDmiNAgAABAgQICCw/QIAAAQIECBCIBQRWDGqOAAECBAgQICCw/AABAgQIECBAIBYQWDGoOQIECBAgQICAwPIDBAgQIECAAIFYQGDFoOYIECBAgAABAgLLDxAgQIAAAQIEYgGBFYOaI0CAAAECBAgILD9AgAABAgQIEIgFBFYMao4AAQIECBAgILD8AAECBAgQIEAgFhBYMag5AgQIECBAgIDA8gMECBAgQIAAgVhAYMWg5ggQIECAAAECDziDTIxb96oXAAAAAElFTkSuQmCC",
    },
  ]);
  useEffect(() => {
    if (id) {
      doGet(`waitlist/${id}?$select=profile`, setprofilePic, () => {});
    }
  }, [id]);

  return (
    <>
      <div
        key={id}
        className="profileSnapshot flex max-w-[140px] flex-col items-center justify-center text-center">
        <Avatar profilePhoto={profile[0].Profile} displayName={displayName} />
        <Button className={"mt-[15px] w-[120px]"} text={displayName} isLoading={false} kind={"secondary"} />
        {shouldDisplaySchool ? <span className={"mx-[7px] mt-[4px]"}>{schoolNickname}</span> : ""}
        {shouldDisplayMajor ? <span className={"mx-[7px] mt-[4px]"}>{major}</span> : ""}
      </div>
    </>
  );
}