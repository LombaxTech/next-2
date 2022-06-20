import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { firebaseApp, db } from "../firebase/firebaseClient";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

import { useRouter } from "next/router";

const auth = getAuth(firebaseApp);

const useCustomAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [authUser, authUserLoading, authUserError] = useAuthState(auth);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    init();
  }, [authUserLoading, authUser]);

  async function init() {
    if (!authUserLoading && !authUser) {
      router.push("/login");
    }

    if (!authUserLoading && authUser) {
      try {
        onSnapshot(doc(db, "users", authUser.uid), (userDoc) =>
          setUser({ ...userDoc.data(), ...authUser })
        );

        console.log(authUser);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }

  return {
    user,
    authUser,
    loading,
    authUserError,
  };
};

export default useCustomAuth;
