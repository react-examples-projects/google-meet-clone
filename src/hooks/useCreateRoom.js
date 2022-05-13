import { useToasts } from "@geist-ui/core";
import { getToken } from "../helpers/http";
import { useQuery } from "react-query";
import Video from "twilio-video";
import { useState } from "react";
import { useRoomContext } from "../context/RoomProvider";

export default function useCreateRoom(identity, room) {
  
  const { setToast } = useToasts();
  const { setRoom, deviceIdVideo, deviceIdAudio } = useRoomContext();
  const [_room, _setRoom] = useState(null);
  const isCorrectPayload = !!identity && !!room;
  const { isLoading, isError, error, data, refetch } = useQuery(
    ["room", { identity, room }],
    getToken,
    { enabled: isCorrectPayload, onSuccess }
  );

  async function onSuccess({ token }) {
    const roomTwilio = await Video.connect(token, {
      video: {
        deviceId: deviceIdVideo,
      },
      audio: {
        deviceId: deviceIdAudio,
      },
      dominantSpeaker: true,
    });

    roomTwilio.on("participantConnected", (p) => {
      setToast({
        text: `${p.identity} entró a la sala`,
        type: "success",
      });
    });

    roomTwilio.on("participantDisconnected", (p) => {
      setToast({
        text: `${p.identity} salió de la sala`,
        type: "warning",
      });
    });

    _setRoom(roomTwilio);
    setRoom(roomTwilio);
  }

  return {
    isLoading,
    isError,
    error,
    data,
    refetch,
    room: _room,
  };
}
