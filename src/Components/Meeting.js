import { useRoomContext } from "../context/RoomProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useCreateRoom from "../hooks/useCreateRoom";
import VideoStreaming from "./VideoStreaming";
import MeetingLoader from "./Loaders/MeetingLoader";

export default function Meeting() {
  const navigate = useNavigate();
  const { identity, roomName, room } = useRoomContext();
  const { isLoading, isError } = useCreateRoom(identity, roomName);

  useEffect(() => {
    if (!identity || !roomName) return navigate("/meet");
  }, [identity, roomName]);

  if (isError) return "Ocurrió un error al crear la sala";
  
  if (isLoading || room === null) return <MeetingLoader />

  return (
    <>
      <h1>La sala se creo con exito!</h1>
      <VideoStreaming />
    </>
  );
}
