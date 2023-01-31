import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  enableMultiTabIndexedDbPersistence,
} from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { config } from "./config";
import { Platform } from "react-native";
import { connectStorageEmulator, getStorage } from "firebase/storage";

function initializeServices() {
  const isConfigured = getApps().length > 0;
  const firebaseApp = initializeApp(config.firebase);
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const functions = getFunctions(getApp());
  const storage = getStorage(firebaseApp);
  return { auth, firebaseApp, firestore, functions, isConfigured, storage };
}

function connectToEmulators({ auth, firestore, functions, storage }) {
  if (Platform.OS === "web") {
    if (location.hostname === "localhost") {
      connectFirestoreEmulator(firestore, "localhost", 8080);
      connectAuthEmulator(auth, "http://localhost:9099");
      connectFunctionsEmulator(functions, "localhost", 5001);
      connectStorageEmulator(storage, "localhost", 9199);
    }
  } else if (Platform.OS === "ios") {
    connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
    connectFunctionsEmulator(functions, "127.0.0.1", 5001);
    connectStorageEmulator(storage, "127.0.0.1", 9199);
  } else if (Platform.OS === "android") {
    connectFirestoreEmulator(firestore, "10.0.2.2", 8080);
    connectAuthEmulator(auth, "10.0.2.2:9099");
    connectFunctionsEmulator(functions, "10.0.2.2", 5001);
    connectStorageEmulator(storage, "10.0.2.2", 9199);
  }
}

export function getFirebase() {
  const services = initializeServices();
  if (!services.isConfigured) {
    connectToEmulators(services);
    enableMultiTabIndexedDbPersistence(services.firestore);
  }
  return services;
}
