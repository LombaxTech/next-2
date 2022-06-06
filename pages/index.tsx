import type { NextPage } from "next";

import CreateCalendarEvent from "../components/CreateCalendarEvent";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { getAuth } from "firebase/auth";
import { firebaseApp, db } from "../firebase/firebaseClient";
import { doc, getDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);

const Home: NextPage = () => {
  const router = useRouter();

  const [authUser, loading, error] = useAuthState(auth);
  const [firestoreUser, setFirestoreUser] = useState(null);

  async function getFirestoreUser() {
    try {
      let userDocRef = doc(db, "users", authUser.uid);
      let userDoc = await getDoc(userDocRef);
      console.log(userDoc.data());
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

  if (loading) return <h1>Loading...</h1>;

  if (firestoreUser)
    return (
      <div>
        {firestoreUser.googleAuthorised === false && (
          <div className="bg-blue-500 text-white p-2 text-center flex justify-center items-center gap-4">
            <h1>Allow Google Permissions to Activate Your Account</h1>
            <button
              onClick={() => router.push("/gauth")}
              className="border border-white px-4 py-2 rounded-md flex"
            >
              Set Up Google Permissions
            </button>
          </div>
        )}
        {firestoreUser.googleAuthorised && <CreateCalendarEvent />}
        hello
      </div>
    );
};

export default Home;
