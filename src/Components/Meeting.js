import { useRoomContext } from "../context/RoomProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useCreateRoom from "../hooks/useCreateRoom";
import VideoStreaming from "./VideoStreaming";
import MeetingLoader from "./Loaders/MeetingLoader";
import MeetError from "./MeetError";
import { existsSession } from "../helpers/storage";

export default function Meeting() {
  const navigate = useNavigate();
  const session = existsSession();
  const { identity, roomName, room } = useRoomContext();
  const { isLoading, isError, refetch } = useCreateRoom(identity, roomName);

  useEffect(() => {
    if (!session) return navigate("/meet");
    // if (!identity || !roomName) return navigate("/meet");
  }, [identity, roomName]);

  if (isError) return <MeetError refetch={refetch} />;

  if (isLoading || room === null) return <MeetingLoader />;

  return <VideoStreaming />;
}
