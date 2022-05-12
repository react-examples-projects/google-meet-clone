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

      p.tracks.forEach((publication) => {
        if (publication.isSubscribed) {
          handleTrackDisabled(publication.track);
        }
        publication.on("subscribed", handleTrackDisabled);
      });
    });

    roomTwilio.on("participantDisconnected", (p) => {
      setToast({
        text: `${p.identity} salió de la sala`,
        type: "warning",
      });
    });

    roomTwilio.participants.forEach((participant) => {
      participant.tracks.forEach((publication) => {
        if (publication.isSubscribed) {
          handleTrackDisabled(publication.track);
        }
        publication.on("subscribed", handleTrackDisabled);
      });
    });

    _setRoom(roomTwilio);
    setRoom(roomTwilio);
  }

  function handleTrackDisabled(track) {
    track.on("disabled", () => {
      console.log("se desactivo un track");
      /* Hide the associated <video> element and show an avatar image. */
    });

    track.on("enabled", () => {
      console.log("se activo un track");
      /* Hide the associated <video> element and show an avatar image. */
    });
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
