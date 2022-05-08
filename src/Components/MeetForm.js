import { Input, useToasts } from "@geist-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TwilioRoomSchema } from "../helpers/schemas";
import { useRoomContext } from "../context/RoomProvider";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ErrorText from "./TextError";
import useNameGenerator from "../hooks/useNameGenerator";

export default function MeetForm() {
  const navigate = useNavigate();
  const { setToast } = useToasts();
  const { setIdentity, setRoomName } = useRoomContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TwilioRoomSchema),
    defaultValues: {
      identity: useNameGenerator(),
      room: uuidv4(),
    },
  });

  const onSubmit = ({ identity, room }) => {
    setToast({
      text: "Creando sala...",
      type: "success",
    });
    setIdentity(identity);
    setRoomName(room);
    navigate("/meeting");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="form-create-room">
      <div className="mb-3">
        <label htmlFor="identity" className="d-block mb-3 text-muted">
          Nombre de usuario
        </label>
        <Input
          {...register("identity")}
          name="identity"
          id="identity"
          placeholder="Chapulin"
          width="100%"
        />
        <ErrorText
          className="mt-2"
          text={errors.identity?.message}
          isVisible={!!errors.identity?.message}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="room" className="d-block mb-3 text-muted">
          Identificador de la sala
        </label>
        <Input {...register("room")} name="room" id="room" width="100%" />
        <ErrorText
          className="mt-2"
          text={errors.room?.message}
          isVisible={!!errors.room?.message}
        />
      </div>
    </form>
  );
}
