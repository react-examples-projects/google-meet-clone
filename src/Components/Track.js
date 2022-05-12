import { useEffect, memo, useRef } from "react";
import useTrack from "../hooks/useTrack";

function Track({ publication, participant }) {
  const track = useTrack(publication);
  const trackRef = useRef(null);
  const trackId = `${publication?.trackSid}_${participant.identity}`;

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.id = trackId;
      track?.attach(trackRef?.current);
    }
  }, [track, publication.trackSid, trackId]);

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
