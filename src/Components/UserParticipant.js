import useDominantSpeaker from "../hooks/useDominantSpeaker";
import usePublications from "../hooks/usePublications";
import TrackList from "./TrackList";
import css from "./styles/videoStreaming.module.scss";
import cls from "classnames";
import { Text, Dot } from "@geist-ui/core";

export default function UserParticipant({ participant }) {
  const publications = usePublications(participant);
  const currentDominantSpeaker = useDominantSpeaker();
  const isSpeaking = currentDominantSpeaker?.identity === participant.identity;

  return (
    <div className={cls(css.userParticipant, { [css.speaking]: isSpeaking })}>
      <Text className={css.participantIdentity} h4>
        {participant.identity}
        <Dot className="ms-2" type="success" />
      </Text>
      <TrackList {...{ publications, participant }} />
    </div>
  );
}
