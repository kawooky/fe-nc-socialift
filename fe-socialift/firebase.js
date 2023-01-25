import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  enableMultiTabIndexedDbPersistence,
} from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { config } from "./config";

function initializeServices() {
  const isConfigured = getApps().length > 0;
  const firebaseApp = initializeApp(config.firebase);
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  return { firebaseApp, firestore, auth, isConfigured };
}

function connectToEmulators({ auth, firestore }) {
  if (location.hostname === "localhost") {
    connectFirestoreEmulator(firestore, "localhost", 8080);
    connectAuthEmulator(auth, "http://localhost:9099");
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

// In LoginPage.jsx:
//
// Insted of "import app from '../../firebase.js';"
// Do: import { getFirebase } from '../../firebase.js';
//
// Instead of "const auth = getAuth(app);"
// Do: const {auth} = getFirebase();
