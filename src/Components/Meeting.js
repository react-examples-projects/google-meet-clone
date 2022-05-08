import { useRoomContext } from "../context/RoomProvider";
import { useNavigate } from "react-router-dom";
import useCreateRoom from "../hooks/useCreateRoom";
import { useEffect } from "react";
import VideoStreaming from "./VideoStreaming";
export default function Meeting() {
  const navigate = useNavigate();
  const { identity, roomName, room } = useRoomContext();
  const { isLoading, isError } = useCreateRoom(identity, roomName);

  useEffect(() => {
    if (!identity || !roomName) return navigate("/meet");
  }, [identity, roomName]);

  if (isLoading || room === null) {
    return "Creando la sala...";
  }

  if (isError) {
    return "Ocurrió un error al crear la sala";
  }

  return (
    <>
      <h1>La sala se creo con exito!</h1>
      <VideoStreaming />
    </>
  );
}
