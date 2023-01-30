import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { Platform } from "react-native";

export function uploadImage(uri, fileRef) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  })
    .then((blob) => {
      return Promise.all([fileRef, uploadBytes(fileRef, blob)]);
    })
    .then(([fileRef]) => {
      return getDownloadURL(fileRef);
    })
}

export function pickImage() {
  return ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  }).then((result) => {
    const uri =
      Platform.OS === "ios"
        ? result.assets[0].uri.replace("file://", "")
        : result.assets[0].uri;

    if (!result.canceled) {
      return uri;
    } else {
      return new Promise.reject("You have not selected an image")
    }
  });
}
