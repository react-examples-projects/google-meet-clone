import { useEffect, useRef } from "react";
import useTrack from "../hooks/useTrack";

export const Track = ({ publication }) => {
  const track = useTrack(publication);
  const trackRef = useRef(null);

  useEffect(() => {
    console.log(track);

      trackRef.current.id = publication.trackSid;
      trackRef?.current.appendChild(track?.attach());
    
  }, [track]);

  if (!track) return null;

  return <div ref={trackRef} />;
};
