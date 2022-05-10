import { useEffect, memo, useRef } from "react";
import useTrack from "../hooks/useTrack";

function Track({ publication }) {
  const track = useTrack(publication);
  const trackRef = useRef(null);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.id = publication?.trackSid;
      track?.attach(trackRef?.current);
    }
  }, [track, publication.trackSid]);

  if (!track) return null;

  if (track.kind === "video") {
    return <video ref={trackRef} />;
  }

  if (track.kind === "audio") {
    return <audio ref={trackRef} />;
  }

  return null;
}

export default memo(Track);
