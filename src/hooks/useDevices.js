import { useQuery } from "react-query";
import { getMediaDevices } from "../helpers/utils";

export default function useDevices() {
  const videoInput = useQuery("videoInput", () =>
    getMediaDevices("videoinput")
  );
  const audioInput = useQuery("audioInput", () =>
    getMediaDevices("audioinput")
  );
  
  return {
    videoInput,
    audioInput,
  };
}
