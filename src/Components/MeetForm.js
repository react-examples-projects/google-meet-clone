import { Input, Select, useToasts } from "@geist-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TwilioRoomSchema } from "../helpers/schemas";
import { useRoomContext } from "../context/RoomProvider";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ErrorText from "./TextError";
import useNameGenerator from "../hooks/useNameGenerator";
import { getMediaDevices } from "../helpers/utils";
import { useQuery } from "react-query";

export default function MeetForm() {
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    isError,
    data: devices = [],
  } = useQuery("devices", () => getMediaDevices("videoinput"));

  const errorCameraCount = devices.length < 1;
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

  console.log(devices?.[0]?.deviceId);

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
        <label htmlFor="camera" className="d-block mb-3 text-muted">
          Cámara
        </label>
        <Select
          name="camera"
          id="camera"
          width="100%"
          disabled={isLoading || errorCameraCount}
          initialValue={errorCameraCount ? "error" : devices?.[0]?.deviceId}
        >
          {errorCameraCount && (
            <Select.Option value="error">
              <ErrorText
                isVisible
                text="No hay cámaras para elegir"
                className="m-0"
              />
            </Select.Option>
          )}

          {devices.map((device) => (
            <Select.Option
              key={device.deviceId}
              value={device.deviceId}
              title={device.label}
            >
              {device.label}
            </Select.Option>
          ))}
        </Select>

        <ErrorText isVisible={isError} text={error} />
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
