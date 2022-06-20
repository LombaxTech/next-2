import { useState, useEffect } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { firebaseApp, db } from "../firebase/firebaseClient";
import { doc, getDoc } from "firebase/firestore";
import axios from "axios";
import { Center, Spinner } from "@chakra-ui/react"
import { useRouter } from "next/router";

const auth = getAuth(firebaseApp);
const BACKEND = `http://localhost:5000`;

export default function CreateCalendarEvent() {
  const router = useRouter();
    const [authUser, authUserLoading, error] = useAuthState(auth);
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
    if (!authUserLoading && authUser) {
      getFirestoreUser();
    }
  }, [authUser, authUserLoading, error]);

  if (loading) return <div className="flex justify-center mt-8"><Spinner /></div>

  if (firestoreUser)
    return (
    );
}
