import useDominantSpeaker from "../hooks/useDominantSpeaker";
import usePublications from "../hooks/usePublications";
import { useRoomContext } from "../context/RoomProvider";
import { Text } from "@geist-ui/core";
import { Track } from "./Track";

export default function VideoStreaming() {
  const { room } = useRoomContext();
  const publications = usePublications(room?.localParticipant);

  return (
    <div className="container">
      <Text b>{room?.localParticipant.identity}</Text>
      {publications?.map((publication) => (
        <Track key={publication.trackSid} publication={publication} />
      ))}
    </div>
  );
}
