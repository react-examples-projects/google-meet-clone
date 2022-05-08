import constate from "constate";
import useRoom from "../hooks/useRoom";

const [RoomProvider, useRoomContext] = constate(useRoom);

export default function RoomContextProvider({ children }) {
  return <RoomProvider>{children}</RoomProvider>;
}

export { useRoomContext };
