import { useRoomContext } from "../context/RoomProvider";
import { memo } from "react";
import UserParticipant from "./UserParticipant";
import UsersParticipants from "./UsersParticipants";
import css from "./styles/videoStreaming.module.scss";
import useBody from "../hooks/useBody";
import ParticipantControls from "./ParticipantControls";

function VideoStreaming() {
  const { room } = useRoomContext();
  const participant = room?.localParticipant;

  useBody({
    backgroundColor: "#1c1e2e",
    minHeight: "100vh",
    height: "auto",
    color: "#e2e8f0",
  });

  return (
    <div className={css.container}>
      <div className={css.usersParticipantsWrapper}>
        <UserParticipant participant={participant} />
        <ParticipantControls
          participant={participant}
          isRemoteParticipant={false}
        />
      </div>

      <UsersParticipants />
    </div>
  );
}

export default memo(VideoStreaming);
