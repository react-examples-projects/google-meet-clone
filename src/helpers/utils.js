export function imageToBase64(imageFile) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = (err) => reject(err);
    fr.readAsDataURL(imageFile);
  });
}

export function isFileTooLarge(sizeImage) {
  const SIZE_ALLOWED = 3; // Mb
  const size = (sizeImage / (1024 * 1024)).toFixed(2);
  return size > SIZE_ALLOWED;
}

export function isNotValidFileType(mimeType) {
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/webp",
    "image/png",
  ];
  return !SUPPORTED_FORMATS.includes(mimeType);
}

export function isValidImgFile(imgFile) {
  if (isNotValidFileType(imgFile.type)) {
    alert(`El archivo ${imgFile.name} no es una imágen`);
    return false;
  }

  if (isFileTooLarge(imgFile.size)) {
    alert(`La imágen ${imgFile.name} es muy pesada, debe ser menor a 3mb`);
    return false;
  }

  return true;
}

export function isValidFile(files) {
  return new Promise((resolve, reject) => {
    let isValid = true,
      i = 0,
      len = files.length;

    while (i < len && isValid) {
      if (isFileTooLarge(files[i].size)) {
        alert(`La imágen ${files[i].name} es muy pesada, debe ser menor a 3mb`);
        reject(
          `La imágen ${files[i].name} es muy pesada, debe ser menor a 3mb`
        );
        isValid = false;
      } else if (isNotValidFileType(files[i].type)) {
        alert(`El archivo ${files[i].name} no es una imágen`);
        reject(`El archivo ${files[i].name} no es una imágen`);
        isValid = false;
      }
      i++;
    }
    resolve(files);
  });
}

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
