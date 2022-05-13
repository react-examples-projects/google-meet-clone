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
