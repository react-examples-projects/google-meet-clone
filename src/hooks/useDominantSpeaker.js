import { useEffect, useState } from "react";
import { useRoomContext } from "../context/RoomProvider";

export default function useDominantSpeaker() {
  const { room } = useRoomContext();
  const [dominantSpeaker, setDominantSpeaker] = useState(
    room?.dominantSpeaker ?? null
  );

  useEffect(() => {
    if (room) {
      const handleDominantSpeakerChanged = (newDominantSpeaker) => {
        if (newDominantSpeaker !== null) {
          setDominantSpeaker(newDominantSpeaker);
        }
      };
      const handleParticipantDisconnected = (participant) => {
        setDominantSpeaker((prevDominantSpeaker) => {
          return prevDominantSpeaker === participant
            ? null
            : prevDominantSpeaker;
        });
      };

      room.on("dominantSpeakerChanged", handleDominantSpeakerChanged);
      room.on("participantDisconnected", handleParticipantDisconnected);
      return () => {
        room.off("dominantSpeakerChanged", handleDominantSpeakerChanged);
        room.off("participantDisconnected", handleParticipantDisconnected);
      };
    }
  }, [room]);

  return dominantSpeaker;
}
