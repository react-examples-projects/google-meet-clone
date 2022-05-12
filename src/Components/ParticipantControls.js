import { Button, Grid } from "@geist-ui/core";
import {
  BiVolumeMute,
  BiVolumeFull,
  BiVideo,
  BiVideoOff,
  BiExpand,
  BiMicrophone,
  BiMicrophoneOff,
  BiPhone,
} from "react-icons/bi";
import { useEffect, useState } from "react";
import { useRoomContext } from "../context/RoomProvider";
import { fullScreendVideo } from "../helpers/utils";
import useToggle from "../hooks/useToggle";
import css from "./styles/videoStreaming.module.scss";
import cls from "classnames";

export default function ParticipantControls({
  participant,
  isRemoteParticipant,
}) {
  const { disconnect } = useRoomContext();
  const [currentVideoExpanded, setCurrentVideoExpanded] = useState(null);
  const [isExpanded, toggleExpanded] = useToggle();
  const [isMicroMuted, toggleMicroMuted] = useToggle();
  const [isMutedAudio, toggleMutedAudio] = useToggle();
  const [isVideoOff, toggleVideoOff] = useToggle();
  const breackpoints = {
    xs: 7,
    sm: 7,
    md: 7,
    lg: 7,
    xl: 7,
  };

  const mute = () => {
    participant.audioTracks.forEach((publication) => {
      const trackId = `${publication?.trackSid}_${participant.identity}`;
      const audioNode = document.getElementById(trackId);

      if (audioNode) {
        audioNode.muted = !isMutedAudio;
      }
    });

    toggleMutedAudio();
  };

  const turnOffCamera = () => {
    participant.videoTracks.forEach((publication) => {
      if (isVideoOff) {
        publication.track.enable();
      } else {
        publication.track.disable();
      }
    });
    toggleVideoOff();
  };

  const muteMicro = () => {
    participant.audioTracks.forEach((publication) => {
      if (isMicroMuted) {
        publication.track.enable();
      } else {
        publication.track.disable();
      }
    });
    toggleMicroMuted();
  };

  const expandVideo = () => {
    participant.videoTracks.forEach((publication) => {
      const trackId = `${publication?.trackSid}_${participant.identity}`;
      const videoNode = document.getElementById(trackId);
      if (videoNode && !isExpanded) {
        fullScreendVideo(videoNode);
        setCurrentVideoExpanded(videoNode);
      }
    });

    toggleExpanded();
  };

  useEffect(() => {
    const change = (e) => {
      if (e.target && isExpanded) {
        e.target.style.objectFit = "contain";
        toggleExpanded();
      }else{
        e.target.style.objectFit = "cover";
      }
    };
    window.addEventListener("fullscreenchange", change);

    return () => window.removeEventListener("fullscreenchange", change);
  }, [isExpanded, toggleExpanded]);

  return (
    <div className={css.participantControls}>
      <Grid.Container gap={1} justify="center">
        {!isRemoteParticipant && (
          <Grid {...breackpoints}>
            <Button
              iconRight={isMicroMuted ? <BiMicrophoneOff /> : <BiMicrophone />}
              onClick={muteMicro}
              scale={0.5}
              className="p-0"
              width="100%"
            />
          </Grid>
        )}

        {!isRemoteParticipant && (
          <Grid {...breackpoints}>
            <Button
              iconRight={isVideoOff ? <BiVideoOff /> : <BiVideo />}
              onClick={turnOffCamera}
              scale={0.5}
              className="p-0"
              width="100%"
            />
          </Grid>
        )}

        {isRemoteParticipant && (
          <Grid {...breackpoints}>
            <Button
              iconRight={isMutedAudio ? <BiVolumeMute /> : <BiVolumeFull />}
              onClick={mute}
              scale={0.5}
              className="p-0"
              width="100%"
            />
          </Grid>
        )}

        {isRemoteParticipant && (
          <Grid {...breackpoints}>
            <Button
              onClick={expandVideo}
              iconRight={<BiExpand />}
              scale={0.5}
              className="p-0"
              width="100%"
            />
          </Grid>
        )}

        {!isRemoteParticipant && (
          <Grid {...breackpoints}>
            <Button
              iconRight={<BiPhone />}
              className={cls("p-0", css.endCall)}
              onClick={disconnect}
              scale={0.5}
              width="100%"
            />
          </Grid>
        )}
      </Grid.Container>
    </div>
  );
}
