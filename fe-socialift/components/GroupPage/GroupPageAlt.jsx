import {
    collection,
    getDocs,
    getDoc,
    getFirestore,
    query,
    where,
    collectionGroup,
    addDoc,
    doc,
    updateDoc,
  } from "firebase/firestore";
  import { getFirebase } from "../../firebase";

export const GroupAlt = (groupId) => {
    const { auth, storage } = getFirebase();
    const db = getFirestore();
    const loggedInUser = auth.currentUser.uid

    const group = doc(db, 'groups', groupId)
    

}