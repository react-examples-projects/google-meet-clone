import { useEffect, memo, useRef } from "react";
import { BiVideoOff, BiMicrophoneOff } from "react-icons/bi";
import css from "./styles/videoStreaming.module.scss";
import useToggle from "../hooks/useToggle";
import useTrack from "../hooks/useTrack";

function Track({ publication, participant, isRemoteParticipant }) {
  const track = useTrack(publication);
  const trackRef = useRef(null);
  const trackId = `${publication?.trackSid}_${participant.identity}`;

  const [isCameraDisabled, toggleCameraDisabled] = useToggle();
  const [isAudioDisabled, toggleAudioDisabled] = useToggle();

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.id = trackId;
      track?.attach(trackRef?.current);
    }
  }, [track, publication.trackSid, trackId]);

  useEffect(() => {
    track?.on("disabled", () => {
      track.kind === "video" && toggleCameraDisabled();
      track.kind === "audio" && toggleAudioDisabled();
    });

    track?.on("enabled", () => {
      track.kind === "video" && toggleCameraDisabled();
      track.kind === "audio" && toggleAudioDisabled();
    });
  }, [track, toggleCameraDisabled, toggleAudioDisabled]);

  if (!track) return null;

  return (
    <div className="w-100">
      {isRemoteParticipant &&
        (isCameraDisabled || !track.isEnabled) &&
        track.kind === "video" && (
          <BiVideoOff className={css.userPartipantDisabledTrack} />
        )}
      {isRemoteParticipant &&
        (isAudioDisabled || !track.isEnabled) &&
        track.kind === "audio" && (
          <BiMicrophoneOff className={css.userPartipantDisabledTrack} />
        )}

      {track.kind === "video" && <video ref={trackRef} />}
      {track.kind === "audio" && <audio ref={trackRef} />}
    </div>
  );
}

export default memo(Track);
