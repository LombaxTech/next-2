import { useState, useEffect } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { firebaseApp, db } from "../firebase/firebaseClient";
import { doc, getDoc } from "firebase/firestore";

import axios from "axios";

const auth = getAuth(firebaseApp);
const BACKEND = `http://localhost:5000`;

export default function CreateCalendarEvent() {
  const [authUser, loading, error] = useAuthState(auth);
  const [firestoreUser, setFirestoreUser] = useState(null);

  async function getFirestoreUser() {
    try {
      let userDocRef = doc(db, "users", authUser.uid);
      let userDoc = await getDoc(userDocRef);
      //   console.log(userDoc.data());
      setFirestoreUser(userDoc.data());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!loading && authUser) {
      getFirestoreUser();
    }
  }, [authUser, loading, error]);

  async function createEvent() {
    try {
      console.log("creating event");

      let res = await axios.post(`${BACKEND}/create-calendar-event`, {
        refresh_token: firestoreUser.refresh_token,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  if (firestoreUser)
    return (
      <div className="flex justify-center mt-4">
        {/* <h1>Create Calendar Event</h1> */}
        <button
          className="px-4 py-2 bg-teal-500 text-white rounded-md"
          onClick={createEvent}
        >
          Create Calendar Event
        </button>
      </div>
    );
}
