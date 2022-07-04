import { useForm } from "react-hook-form";

import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  // where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseClient";

import useCustomAuth from "../../customHooks/useCustomAuth";

import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import { MenuDivider } from "@chakra-ui/react";

export default function Test() {
  const router = useRouter();

  const [chatId, setChatId] = useState("");

  const { register, handleSubmit, reset, setFocus } = useForm();
  const { user, loading } = useCustomAuth();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function init() {
      if (router.isReady) {
        console.log(router.query.chatId);
        setChatId(router.query.chatId);

        // const messagesCollectionRef = collection(
        //   db,
        //   "chats",
        //   chatId,
        //   "messages"
        // );
        // const q = query(messagesCollectionRef, orderBy("sentAt"));

        const msgsRef = collection(
          db,
          "chats",
          router.query.chatId,
          "messages"
        );

        // const q =
        const q = query(msgsRef, orderBy("sentAt"));

        onSnapshot(q, (msgSnapshot) => {
          let messages = [];
          msgSnapshot.forEach((m) => messages.push({ id: m.id, ...m.data() }));
          setMessages(messages);
          console.log(messages);
        });
      }
    }

    init();
  }, [router.isReady]);

  const sendMessage = async (data) => {
    const { message } = data;
    console.log(message);

    try {
      const m = {
        text: message,
        sentAt: serverTimestamp(),
        sender: user.firstName,
      };

      // const collectionRef = collection(db, "chats", "test", "messages");
      const collectionRef = collection(db, "chats", chatId, "messages");

      const docRef = await addDoc(collectionRef, m);
      console.log("done");
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  // return (
  //   <div>

  //     <div>{messages && messages.map((m) => <div>{m.text}</div>)}</div>
  //   </div>
  // );

  const MyMessage = () => (
    <li class="flex justify-start">
      <div class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
        <span class="block">Hi</span>
      </div>
    </li>
  );
  const YourMessage = () => (
    <li class="flex justify-end">
      <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
        <span class="block">Hiiii</span>
      </div>
    </li>
  );

  const Message = ({ text }) => (
    <li class="flex justify-start">
      <div class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
        <span class="block">{text}</span>
      </div>
    </li>
  );

  return (
    <div className=" flex-1 flex max-h-full overflow-hidden">
      <div className=" flex-1 flex flex-col">
        <div className="overflow-y-auto flex-1 p-4 scrollbar-thin  scrollbar-thumb-gray-300">
          <ul className="space-y-2">
            {messages && messages.map((msg) => <Message text={msg.text} />)}
          </ul>
        </div>
        <div className="w-full ">
          {/* <MessageInput /> */}
          <form
            className="flex items-center justify-between w-full p-3 border-t border-gray-300"
            onSubmit={handleSubmit(sendMessage)}
          >
            <input
              type="text"
              {...register("message")}
              placeholder="enter message"
              className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
            />

            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
