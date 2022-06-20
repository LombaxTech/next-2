import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { firebaseApp, db } from "../../firebase/firebaseClient";
import { doc, getDoc } from "firebase/firestore";
import axios from "axios";
import { Spinner, Avatar } from "@chakra-ui/react";

const auth = getAuth(firebaseApp);
const BACKEND = `http://localhost:5000`;

export default function UserProfile() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authUser, authUserLoading, error] = useAuthState(auth);
  const [firestoreUser, setFirestoreUser] = useState(null);
  const [pageUser, setPageUser] = useState(null);

  async function init() {
    if (router.isReady) {
      const { userId } = router.query;

      try {
        //   get logged in user details
        let userDocRef = doc(db, "users", authUser.uid);
        let userDoc = await getDoc(userDocRef);
        setFirestoreUser(userDoc.data());

        // TODO: Get details of user of page
        let pageUserRef = doc(db, "users", userId);
        const pageUserSnapshot = await getDoc(pageUserRef);
        const pageUser = {
          id: pageUserSnapshot.id,
          ...pageUserSnapshot.data(),
        };
        setPageUser(pageUser);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    if (!authUserLoading && authUser) {
      init();
    }
  }, [authUser, authUserLoading, error, router.isReady]);

  if (loading)
    return (
      <div className="flex justify-center mt-8">
        <Spinner />
      </div>
    );
  if (firestoreUser)
    return (
      <div className="flex flex-col items-center justify-center mt-8">
        <h1>{pageUser.firstName}'s page</h1>
        <Avatar src={pageUser.profilePictureUrl} />
      </div>
    );
}
