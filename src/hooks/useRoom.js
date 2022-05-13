import { useState } from "react";
import { getSession, deleteSession } from "../helpers/storage";

export default function useRoom() {
  const session = getSession();
  const [room, _setRoom] = useState({
    identity: session?.identity || "",
    roomName: session?.roomName || "",
    room: null,
    deviceIdVideo: session?.deviceIdVideo || "",
    deviceIdAudio: session?.deviceIdAudio || "",
  });

  const setIdentity = (_identity) => {
    _setRoom((r) => ({ ...r, identity: _identity }));
  };

  const setRoomName = (roomName) => {
    _setRoom((r) => ({ ...r, roomName }));
  };

  const setRoom = (room) => {
    _setRoom((r) => ({ ...r, room }));
  };

  const setDeviceIdVideo = (deviceIdVideo) => {
    _setRoom((r) => ({ ...r, deviceIdVideo }));
  };

  const setDeviceIdAudio = (deviceIdAudio) => {
    _setRoom((r) => ({ ...r, deviceIdAudio }));
  };

  const disconnect = () => {
    room.room?.disconnect();
    deleteSession();
    window.location.href = "/";
  };

  return {
    ...room,
    disconnect,
    setRoom,
    setIdentity,
    setRoomName,
    setDeviceIdVideo,
    setDeviceIdAudio,
  };
}
