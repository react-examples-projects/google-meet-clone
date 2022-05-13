import { useRoomContext } from "../context/RoomProvider";
import { memo, useEffect } from "react";
import { BiGroup } from "react-icons/bi";
import { Button } from "@geist-ui/core";
import UserParticipant from "./UserParticipant";
import UsersParticipants from "./UsersParticipants";
import css from "./styles/videoStreaming.module.scss";
import cls from "classnames";
import useBody from "../hooks/useBody";
import useToggle from "../hooks/useToggle";
import ParticipantControls from "./ParticipantControls";
import MeetInfo from "./MeetInfo";
import { useState } from "react";

function VideoStreaming() {
  const { room } = useRoomContext();
  const [isAudioReady, setAudioReady] = useState(false);
  const participant = room?.localParticipant;
  const [isVisible, toggleVisible] = useToggle();

  useBody({
    backgroundColor: "#1c1e2e",
    minHeight: "100vh",
    height: "auto",
    color: "#e2e8f0",
  });

  useEffect(() => {
    let timeOutId = null;
    const disconnect = () => room?.disconnect();
    window.addEventListener("beforeunload", disconnect);

    if (room) {
      setAudioReady(true);
      timeOutId = setTimeout(() => {
        setAudioReady(false);
      }, 1000);
    }

    return () => {
      window.removeEventListener("beforeunload", disconnect);
      clearTimeout(timeOutId);
    };
  }, [room]);

  return (
    <div className={css.container}>
      <div className={css.usersParticipantsWrapper}>
        <UserParticipant participant={participant} />
        <ParticipantControls
          participant={participant}
          isRemoteParticipant={false}
        />

        <Button
          onClick={toggleVisible}
          scale={1 / 2}
          className={cls("p-1", css.btnGhost)}
          style={{ position: "absolute", right: "1rem", bottom: "1rem" }}
          iconRight={<BiGroup />}
          auto
        />
      </div>

      <MeetInfo />

      <UsersParticipants {...{ isVisible, toggleVisible }} />

      {room && isAudioReady && <audio src="./meet_ready.mp3" autoPlay />}
    </div>
  );
}

export default memo(VideoStreaming);
