import { Input, Select, useToasts, Text } from "@geist-ui/core";
import { useRoomContext } from "../context/RoomProvider";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { setVideoStream } from "../helpers/utils";
import ErrorText from "./TextError";
import useMeetForm from "../hooks/useMeetForm";
import useDevices from "../hooks/useDevices";
import { saveSession } from "../helpers/storage";

export default function MeetForm({ visibleModal }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const { audioInput, videoInput } = useDevices();

  const videoDevices = videoInput.data || [];
  const audioDevices = audioInput.data || [];

  const errorCameraCount = videoDevices.length < 1;
  const errorAudioCount = audioDevices.length < 1;

  const [currentStream, setCurrentStream] = useState(null);
  const { setToast } = useToasts();
  const {
    setIdentity,
    setRoomName,
    setDeviceIdVideo,
    setDeviceIdAudio,
    deviceIdVideo,
    deviceIdAudio,
  } = useRoomContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useMeetForm();

  const onSubmit = ({ identity, room }) => {
    if (!deviceIdVideo) return;

    setToast({
      text: "Creando sala...",
      type: "success",
    });
    setIdentity(identity);
    setRoomName(room);
    saveSession({ identity, roomName: room, deviceIdVideo, deviceIdAudio });
    navigate("/meeting");
  };

  useEffect(() => {
    (async () => {
      if (deviceIdVideo && deviceIdAudio) {
        const stream = await setVideoStream({
          videoNode: videoRef.current,
          deviceIdVideo,
          deviceIdAudio,
        });

        setCurrentStream(stream);
      }
    })();
  }, [deviceIdVideo, deviceIdAudio]);

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
          onChange={(deviceId) => setDeviceIdVideo(deviceId)}
          disabled={videoInput.isLoading || errorCameraCount}
          initialValue={
            errorCameraCount ? "error" : videoDevices?.[0]?.deviceId
          }
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

          {videoDevices.map((device) => (
            <Select.Option
              key={device.deviceId}
              value={device.deviceId}
              title={device.label}
            >
              {device.label}
            </Select.Option>
          ))}
        </Select>

        <ErrorText
          className="mt-2"
          text="Debe seleccionar una fuente de video"
          isVisible={!deviceIdVideo}
        />

        <ErrorText isVisible={videoInput.isError} text={videoInput.error} />
      </div>

      <div className="mb-3">
        <label htmlFor="audio" className="d-block mb-3 text-muted">
          Fuente de audio
        </label>
        <Select
          name="audio"
          id="audio"
          width="100%"
          onChange={(deviceId) => setDeviceIdAudio(deviceId)}
          disabled={audioInput.isLoading || errorAudioCount}
          initialValue={errorAudioCount ? "error" : audioDevices?.[0]?.deviceId}
        >
          {errorAudioCount && (
            <Select.Option value="error">
              <ErrorText
                isVisible
                text="No hay fuentes de audio para elegir"
                className="m-0"
              />
            </Select.Option>
          )}

          {audioDevices.map((device) => (
            <Select.Option
              key={device.deviceId}
              value={device.deviceId}
              title={device.label}
            >
              {device.label}
            </Select.Option>
          ))}
        </Select>

        <ErrorText
          className="mt-2"
          text="Debe seleccionar una fuente de audio"
          isVisible={!deviceIdAudio}
        />

        <ErrorText isVisible={videoInput.isError} text={videoInput.error} />
      </div>

      {deviceIdVideo && deviceIdAudio && (
        <video
          width="100%"
          className="my-2 d-block w-100 h-100"
          style={{ borderRadius: "5px" }}
          height="200px"
          ref={videoRef}
          autoPlay
        />
      )}

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

      <Text className="text-muted" small>
        Debes seleccionar manualmente los dispotivios de cámara y fuente de
        audio para previsualizar su funcionamiento
      </Text>
      <Text className="text-muted d-block mt-1 fw-bold" small>
        Recuerda proporcinar permisos de acceder a tus dispositivos de cámara
        y audio.
      </Text>
    </form>
  );
}
