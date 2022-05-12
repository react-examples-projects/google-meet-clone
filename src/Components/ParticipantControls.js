import { Button, Grid } from "@geist-ui/core";
import {
  BiVolumeMute,
  BiVolumeFull,
  BiVideo,
  BiVideoOff,
  BiExpand,
  BiMicrophone,
  BiMicrophoneOff,
} from "react-icons/bi";
import useToggle from "../hooks/useToggle";

import css from "./styles/videoStreaming.module.scss";

export default function ParticipantControls({
  participant,
  isRemoteParticipant,
}) {
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
      audioNode.muted = isMutedAudio;
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
        console.log("habilitando audio")
        publication.track.enable();
      } else {
        publication.track.disable();
      }
    });
    toggleMicroMuted();
  };

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
              iconRight={isMutedAudio ? <BiVolumeFull /> : <BiVolumeMute />}
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
              iconRight={<BiExpand />}
              scale={0.5}
              className="p-0"
              width="100%"
            />
          </Grid>
        )}
      </Grid.Container>
    </div>
  );
}
