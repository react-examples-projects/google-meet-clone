import { useState } from "react";

export default function useRoom() {
  const [room, _setRoom] = useState({ identity: "", roomName: "", room: null });

  const setIdentity = (_identity) => {
    _setRoom((r) => ({ ...r, identity: _identity }));
  };

  const setRoomName = (roomName) => {
    _setRoom((r) => ({ ...r, roomName }));
  };

  const setRoom = (room) => {
    _setRoom((r) => ({ ...r, room }));
  };

  return { ...room, setRoom, setIdentity, setRoomName };
}
