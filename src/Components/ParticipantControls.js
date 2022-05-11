import { Text, Button, Tooltip, Grid } from "@geist-ui/core";
import {
  BiVolumeMute,
  BiVolumeFull,
  BiVideo,
  BiVideoOff,
  BiExpand,
  BiBookmark,
} from "react-icons/bi";
import useToggle from "../hooks/useToggle";

import css from "./styles/videoStreaming.module.scss";

export default function ParticipantControls({ participant }) {
  const [isMutedAudio, toggleMutedAudio] = useToggle();
  const [isVideoOff, toggleVideoOff] = useToggle();

  const mute = () => {
    participant.audioTracks.forEach((publication) => {
      if (!isMutedAudio) publication.track.disable();
      else publication.track.enable();
    });
    toggleMutedAudio();
  };

  const turnOffCamera = () => {
    participant.videoTracks.forEach((publication) => {
      if (!isVideoOff) publication.track.disable();
      else publication.track.enable();
    });
    toggleVideoOff();
  };

  return (
    <div className={css.participantControls}>
      <Grid.Container gap={1}>
        <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
          <Button
            iconRight={isVideoOff ? <BiVideoOff /> : <BiVideo />}
            onClick={turnOffCamera}
            scale={0.5}
            width="100%"
          />
        </Grid>

        <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
          <Button
            iconRight={isMutedAudio ? <BiVolumeMute /> : <BiVolumeFull />}
            onClick={mute}
            scale={0.5}
            width="100%"
          />
        </Grid>

        <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
          <Button iconRight={<BiExpand />} scale={0.5} width="100%" />
        </Grid>

        <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
          <Button iconRight={<BiBookmark />} scale={0.5} width="100%" />
        </Grid>
      </Grid.Container>
    </div>
  );
}
