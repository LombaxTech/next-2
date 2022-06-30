import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { firebaseApp, db } from "../firebase/firebaseClient";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

import { useRouter } from "next/router";

const auth = getAuth(firebaseApp);

const useCustomAuth = () => {
  const router = useRouter();

  const [authUser, authUserLoading, authUserError] = useAuthState(auth);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    async function init() {
      if (!authUserLoading && !authUser) {
        // router.push("/login");
        // console.log("this happned");
        setUser(null);
        return setLoading(false);
      }

      if (!authUserLoading && authUser) {
        try {
          onSnapshot(doc(db, "users", authUser.uid), (userDoc) => {
            setUser({ ...userDoc.data(), ...authUser });
            setLoading(false);
          });

          // console.log(authUser);
        } catch (error) {
          console.log(error);
          setUser(null);
          setLoading(false);
        }
      }
    }

    init();
  }, [authUserLoading, authUser]);

  return {
    user,
    authUser,
    loading,
    authUserError,
  };
};

export default useCustomAuth;
