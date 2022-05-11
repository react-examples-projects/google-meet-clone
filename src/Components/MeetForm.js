import { Input, Select, useToasts } from "@geist-ui/core";
import { useRoomContext } from "../context/RoomProvider";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useRef, useEffect, useState } from "react";
import { getMediaDevices, setVideoStream } from "../helpers/utils";
import ErrorText from "./TextError";
import useMeetForm from "../hooks/useMeetForm";

export default function MeetForm({ visibleModal }) {
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    isError,
    data: devices = [],
  } = useQuery("devices", () => getMediaDevices("videoinput"));

  const errorCameraCount = devices.length < 1;
  const videoRef = useRef(null);
  const [currentStream, setCurrentStream] = useState(null);
  const { setToast } = useToasts();
  const { setIdentity, setRoomName, setDevice, device } = useRoomContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useMeetForm();

  const onSubmit = ({ identity, room }) => {
    if (!device) return;

    setToast({
      text: "Creando sala...",
      type: "success",
    });
    setIdentity(identity);
    setRoomName(room);
    navigate("/meeting");
  };

  useEffect(() => {
    (async () => {
      if (device) {
        const stream = await setVideoStream({
          videoNode: videoRef.current,
          deviceId: device,
        });

        setCurrentStream(stream);
      }
    })();
  }, [device]);

  useEffect(() => {
    // si el modal no es visible y la camara aun graba, paramos cada track
    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach(function (track) {
          track.readyState === "live" && track.stop();
        });
      }
    };
  }, [visibleModal, currentStream]);

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
          onChange={(deviceId) => setDevice(deviceId)}
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

        {device && (
          <video
            width="100%"
            className="mt-2 d-block w-100 h-100"
            style={{ borderRadius: "5px" }}
            height="200px"
            ref={videoRef}
            autoPlay
          />
        )}

        <ErrorText
          className="mt-2"
          text="Debe seleccionar una fuente de video"
          isVisible={!device}
        />

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
