export async function getMediaDevices(deviceType) {
  let devices = await navigator.mediaDevices.enumerateDevices();
  devices = devices.filter(
    (v, i, a) =>
      a.findIndex((v2) => v2.deviceId === v.deviceId) === i &&
      v.kind === deviceType &&
      !!v.deviceId
  );

  return devices;
}

export async function setVideoStream({
  videoNode,
  deviceIdVideo,
  deviceIdAudio,
}) {
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    audio: {
      deviceId: {
        exact: deviceIdAudio,
      },
    },
    video: {
      deviceId: {
        exact: deviceIdVideo,
      },
    },
  });

  videoNode.srcObject = null;
  videoNode.srcObject = mediaStream;
  return mediaStream;
}

export async function checkPermissionsDevices(cb) {
  if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
    return new Promise((resolve, reject) => {
      navigator.getUserMedia(
        { audio: true, video: true },
        (stream) => {
          if (
            stream.getVideoTracks().length > 0 &&
            stream.getAudioTracks().length > 0
          ) {
            resolve(stream.getVideoTracks(), stream.getAudioTracks());
          } else {
            reject("No hay dispositivos multimedia disponibles");
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  } else {
    alert("Tu navegador no es compatible para esta plataforma");
    return false;
  }
}

export function networkQualityResult(qualitySignal) {
  const quality = {
    0: "cargando...",
    1: "muy baja",
    2: "baja",
    3: "regular",
    4: "buena",
    5: "muy buena",
  };

  return quality[qualitySignal];
}

export function fullScreendVideo(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  } else {
    console.error("`requestFullscreen` is not supported in this browser!");
  }
}
