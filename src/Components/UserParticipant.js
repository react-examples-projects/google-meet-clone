import React from "react";
import useDominantSpeaker from "../hooks/useDominantSpeaker";
import usePublications from "../hooks/usePublications";
import { Text } from "@geist-ui/core";
import TrackList from "./TrackList";

export default function UserParticipant({ participant }) {
  const publications = usePublications(participant);
  const currentDominantSpeaker = useDominantSpeaker();

  return (
    <div className="user-participant">
      <Text b>{participant.identity}</Text>
      <TrackList publications={publications} />
    </div>
  );
}
