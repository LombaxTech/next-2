import { useState, useEffect } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { firebaseApp, db } from "../../firebase/firebaseClient";
import axios from "axios";
import { Center, Spinner, Avatar } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const BACKEND = `http://localhost:5000`;

export default function AllUsers() {
  const router = useRouter();
  const [authUser, authUserLoading, error] = useAuthState(auth);
  const [firestoreUser, setFirestoreUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);

  async function getFirestoreUser() {
    try {
      let userDocRef = doc(db, "users", authUser.uid);
      let userDoc = await getDoc(userDocRef);
      //   console.log(userDoc.data());
      setFirestoreUser(userDoc.data());

      // get all users
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const allUsers = [];
      usersSnapshot.forEach((userDoc) => {
        const user = {
          id: userDoc.id,
          ...userDoc.data(),
        };
        allUsers.push(user);
      });
      setAllUsers(allUsers);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!authUserLoading && authUser) {
      getFirestoreUser();

      // console.log(authUser);
    }
  }, [authUser, authUserLoading, error]);

  function smallBigString(str1, str2) {
    if (str1 < str2) {
      return str1 + str2;
    }
    return str2 + str1;
  }

  if (loading)
    return (
      <div className="flex justify-center mt-8">
        <Spinner />
      </div>
    );

  if (firestoreUser)
    return (
      <div className="flex flex-col  items-center justify-center mt-8">
        <h1>All users</h1>
        <div className="flex flex-col">
          {allUsers.map((user) => (
            <div className="flex justify-center items-center gap-6 my-3">
              <div
                className="cursor-pointer"
                onClick={() => router.push(`/users/${user.id}`)}
              >
                <Avatar src={user.profilePictureUrl} />
              </div>
              <div>{user.firstName}</div>
              <button
                className="btn btn-primary"
                onClick={() =>
                  router.push(`/chats/${smallBigString(user.id, authUser.uid)}`)
                }
              >
                Message
              </button>
            </div>
          ))}
        </div>
      </div>
    );
}
