import { useState } from "react";

export default function useRoom() {
  const [room, _setRoom] = useState({
    identity: "",
    roomName: "",
    room: null,
    deviceIdVideo: "",
    deviceIdAudio: "",
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
    window.location.href = "/meet";
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
