import type { NextPage } from "next";

import CreateCalendarEvent from "../components/CreateCalendarEvent";

import LandingPage from "../components/LandingPage/LandingPage";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { getAuth } from "firebase/auth";
import { firebaseApp, db } from "../firebase/firebaseClient";
import {
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import useCustomAuth from "../customHooks/useCustomAuth";

const auth = getAuth(firebaseApp);

const Home: NextPage = () => {
  const router = useRouter();

  const { user, loading } = useCustomAuth();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log("this is the user");
    console.log(user);

    const messagesRef = collection(db, "chats", "2", "messages");
    onSnapshot(messagesRef, (messagesSnapshot) => {
      let messages = [];

      messagesSnapshot.forEach((message) =>
        messages.push({
          id: message.id,
          ...message.data(),
        })
      );

      setMessages(messages);
      console.log(messages);
    });
  }, [loading, user]);

  const doSomething = async () => {
    try {
      console.clear();
      console.log("do");

      // await addDoc()
      // const docRef = doc(db, "users/Gl3hsIBX2sW0bbA2CqQGiURELBe2");
      // const d = await getDoc(docRef);
      // console.log(d.data());
      // console.log(docRef);
      // console.log(docRef.id);

      // const q = query(collection(db, 'chats'), where('', '==', ''))

      // let chats = await getDocs(collection(db, "chats"));
      // console.log(chats);
      // console.log(chats.length);

      // chats.forEach((chat) => console.log(chat.id));
      // for (let chat of chats.docs) {
      //   console.log(chat.id);
      //   let messages = await getDocs(
      //     collection(db, "chats", chat.id, "messages")
      //   );
      //   // console.log(messages);
      //   messages.forEach((message) => console.log(message.data()));
      // }

      // const chatId = "29";

      // const chat = await getDoc(doc(db, "chats", chatId));
      // console.log(chat.exists());
      // if (chat.exists()) {
      //   // do nothing
      //   console.log("chat already exists");
      // } else {
      //   // create chat
      //   let newChat = await setDoc(doc(db, "chats", chatId), {
      //     users: ["user1", "user2"],
      //   });

      //   let newMessage = await addDoc(
      //     collection(db, "chats", chatId, "messages"),
      //     {
      //       text: "new chat",
      //       sender: "ted mosby",
      //     }
      //   );

      //   console.log("success");
      //   console.log(newChat);
      //   console.log(newMessage);
      //   // console.log(newChat);
      // }

      const q = query(
        collection(db, "chats"),
        where("users", "array-contains", "user1")
      );

      const chats = await getDocs(q);
      // console.log(chats);

      for (let chat of chats.docs) {
        console.log(chat.data());
      }
      return;

      // !==================================================
      const newDoc = {
        text: "From the Future",
        sender: "Eren Yeager",
      };

      const collectionRef = collection(db, "chats", "2", "messages");
      // const collectionRef = collection(db, "chats");

      const newDocRef = await addDoc(collectionRef, newDoc);

      console.log(newDocRef);
      let createdDoc = await getDoc(newDocRef);
      console.log(createdDoc.data());
      // !==================================================

      // const collectionRef = collection(db, "users");
      // console.log(collectionRef);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <h1>Loading...</h1>;

  if (user)
    return (
      <div>
        {user.googleAuthorised === false && (
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
        {user.googleAuthorised && <CreateCalendarEvent />}
        <div className="flex justify-center">
          <button onClick={doSomething} className="btn btn-outline">
            Do Whatever
          </button>
        </div>
        <div className="flex justify-center items-center flex-col">
          <h1>Themed Section</h1>
          <h2>Messages</h2>
          {messages &&
            messages.map((message) => (
              <div className="flex gap-2 justify-center" key={message.id}>
                <div>{message.sender}: </div>
                <div>{message.text}</div>
              </div>
            ))}
        </div>
      </div>
    );

  // return <LandingPage />;
  return <div className="bg-gray-200  flex-1">no user</div>;
  // if (!firestoreUser) return <LandingPage />;
};

export default Home;
