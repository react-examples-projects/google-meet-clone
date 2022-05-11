import React from "react";
import useDominantSpeaker from "../hooks/useDominantSpeaker";
import usePublications from "../hooks/usePublications";
import { Text, Dot } from "@geist-ui/core";
import TrackList from "./TrackList";
import css from "./styles/videoStreaming.module.scss";

export default function UserParticipant({ participant }) {
  const publications = usePublications(participant);
  const currentDominantSpeaker = useDominantSpeaker();

  return (
    <div className={css.userParticipant}>
      <Text className={css.participantIdentity} h4>
        {participant.identity}
        <Dot className="ms-2" type="success" />
      </Text>
      <TrackList publications={publications} />
    </div>
  );
}
