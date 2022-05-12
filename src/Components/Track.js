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

  return (
    <div className="w-100">
      {track.kind === "video" && <video ref={trackRef} />}
      {track.kind === "audio" && <audio ref={trackRef} />}
    </div>
  );
}

export default memo(Track);
