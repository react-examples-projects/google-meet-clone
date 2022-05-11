import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TwilioRoomSchema } from "../helpers/schemas";
import useNameGenerator from "../hooks/useNameGenerator";
import { v4 as uuidv4 } from "uuid";

export default function useMeetForm() {
  const args = useForm({
    resolver: yupResolver(TwilioRoomSchema),
    defaultValues: {
      identity: useNameGenerator(),
      room: uuidv4(),
    },
  });
  return args;
}
