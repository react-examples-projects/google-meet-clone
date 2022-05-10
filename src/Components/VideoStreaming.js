import { useRoomContext } from "../context/RoomProvider";
import { memo } from "react";
import UserParticipant from "./UserParticipant";
import UsersParticipants from "./UsersParticipants";

function VideoStreaming() {
  const { room } = useRoomContext();
  const participant = room?.localParticipant;

  return (
    <div className="container">
      <UserParticipant participant={participant} />
      <UsersParticipants />
    </div>
  );
}

export default memo(VideoStreaming);
