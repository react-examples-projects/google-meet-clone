import { useState } from "react";

export default function useRoom() {
  const [room, _setRoom] = useState({
    identity: "",
    roomName: "",
    room: null,
    device: "",
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

  const setDevice = (device) => {
    _setRoom((r) => ({ ...r, device }));
  };

  return { ...room, setRoom, setIdentity, setRoomName, setDevice };
}
