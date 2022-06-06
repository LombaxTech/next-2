import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseApp, db } from "../firebase/firebaseClient";
import { doc, setDoc, updateDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);

export default function GauthSuccess() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const BACKEND = `http://localhost:5000`;

  const [user, userLoading, error] = useAuthState(auth);

  async function init() {
    if (!userLoading && user && router.isReady) {
      console.log("logging query...");
      console.log(router.query);
      const { code } = router.query;
      console.log({ code });

      if (code != "") {
        try {
          let tokens = await axios.post(`${BACKEND}/gen-tokens`, { code });
          tokens = tokens.data;
          console.log(tokens);
          const { refresh_token, access_token } = tokens;
          if (refresh_token && access_token) {
            // TODO: Get user gmail
            let googleAccountDetails = await axios.get(
              `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`
            );
            googleAccountDetails = googleAccountDetails.data;
            const googleEmailAddress = googleAccountDetails.email;
            // console.log({ googleAccountDetails });

            const uid = user.uid;
            const userRef = doc(db, "users", uid);
            let res = await updateDoc(userRef, {
              googleAuthorised: true,
              refresh_token,
              googleEmailAddress,
            });
          }
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  useEffect(() => {
    init();
  }, [router.isReady, user, userLoading]);

  if (loading)
    return (
      <div className="flex justify-center mt-12">
        <Spinner />
      </div>
    );

  return (
    <div>
      <div className="bg-green-400 text-white text-center p-4">
        Successfully Set Up Google Permissions
      </div>
    </div>
  );
}
