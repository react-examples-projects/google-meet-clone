import { useRoomContext } from "../context/RoomProvider";
import { memo, useEffect, useState } from "react";
import { BiGroup, BiRss } from "react-icons/bi";
import { Button, Tooltip, Text } from "@geist-ui/core";
import { networkQualityResult } from "../helpers/utils";
import UserParticipant from "./UserParticipant";
import UsersParticipants from "./UsersParticipants";
import css from "./styles/videoStreaming.module.scss";
import cls from "classnames";
import useBody from "../hooks/useBody";
import useToggle from "../hooks/useToggle";
import ParticipantControls from "./ParticipantControls";
import MeetInfo from "./MeetInfo";
import MetaTags from "./MetaTags";
import useParticipants from "../hooks/useParticipants";

function VideoStreaming() {
  const { room, identity } = useRoomContext();
  const [isAudioReady, setAudioReady] = useState(false);
  const participant = room?.localParticipant;
  const [isVisible, toggleVisible] = useToggle();
  const [networkQuality, setNetworkQuality] = useState("cargando...");
  const participants = useParticipants();
  const participantsCount = participants.length;

  const networkQualityColor = () => {
    if (networkQuality === 5 || networkQuality === 4) return css.goodNetwork;
    if (networkQuality === 3) return css.regularNetwork;
    return css.badNetwork;
  };

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

      function printNetworkQualityStats(
        networkQualityLevel,
        networkQualityStats
      ) {
        if (networkQualityLevel > 0) setNetworkQuality(networkQualityLevel);

        if (networkQualityStats) {
          console.log("Network Quality statistics:", networkQualityStats);
        }
      }

      printNetworkQualityStats(
        room?.localParticipant.networkQualityLevel,
        room?.localParticipant.networkQualityStats
      );

      room?.localParticipant.on(
        "networkQualityLevelChanged",
        printNetworkQualityStats
      );
    }

    return () => {
      window.removeEventListener("beforeunload", disconnect);
      clearTimeout(timeOutId);
    };
  }, [room]);

  return (
    <>
      <MetaTags title={`Estas en una sala como: ${identity}`} />
      <div className={css.container}>
        <div className={css.usersParticipantsWrapper}>
          <UserParticipant participant={participant} />
          <ParticipantControls
            participant={participant}
            isRemoteParticipant={false}
          />
          <div
            className="d-flex justify-content-end align-items-center"
            style={{
              position: "absolute",
              right: "1rem",
              bottom: "1rem",
              minWidth: "180px",
            }}
          >
            <Tooltip
              text={
                <Text
                  className="d-inline-block text-center m-0"
                  style={{ minWidth: "180px" }}
                  small
                >{`Calidad de red: ${networkQualityResult(
                  networkQuality
                )}`}</Text>
              }
              placement="left"
              className="d-flex justify-content-end align-items-center"
            >
              <Button
                iconRight={<BiRss className={networkQualityColor()} />}
                scale={1 / 2}
                className={cls("p-1", css.btnGhost)}
                auto
              />
            </Tooltip>
            <Button
              onClick={toggleVisible}
              scale={1 / 2}
              className={cls("p-1", css.btnGhost)}
              auto
            >
              <Text
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-3px",
                }}
              >
                {participantsCount}
              </Text>
              <BiGroup />
            </Button>
          </div>
        </div>

        <MeetInfo />

        <UsersParticipants {...{ isVisible, toggleVisible }} />

        {room && isAudioReady && <audio src="./meet_ready.mp3" autoPlay />}
      </div>
    </>
  );
}

export default memo(VideoStreaming);
