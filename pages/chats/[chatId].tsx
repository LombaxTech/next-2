import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import useCustomAuth from "../../customHooks/useCustomAuth";
import {
  getDoc,
  getDocs,
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../../firebase/firebaseClient";
import { ms } from "date-fns/locale";

import { useForm } from "react-hook-form";

export default function Chat() {
  const router = useRouter();

  const { register, handleSubmit, reset, setFocus } = useForm();

  const { user, loading } = useCustomAuth();
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState("");

  async function init() {
    if (!loading && !user) {
      console.log("noooooo");
    }

    if (router.isReady && !loading) {
      const { chatId } = router.query;
      console.log(chatId);
      setChatId(chatId);
      console.log(user);

      // TODO: find messages of chat
      const msgsRef = collection(db, "chats", chatId, "messages");
      const q = query(msgsRef, orderBy("sentAt"));
      // const msgsRef = collection(db, "chats", "2", "messages");
      // let messagesRef = await getDocs(msgsRef);
      // console.log(messagesRef);
      // console.log(messagesRef.docs);
      // console.log(messagesRef.size);
      // messagesRef.

      // TODO: find messages REACTIVE
      // onSnapshot(msgsRef, (msgSnapshot) => {
      onSnapshot(q, (msgSnapshot) => {
        console.log(msgSnapshot.size);
        if (msgSnapshot.size == 0) {
          console.log("havent chatted before");
          // TODO: Set new chat to true;
        } else {
          // TODO: Load messages and set messages true
          console.log("talk again");
        }
        let messages = [];
        msgSnapshot.forEach((msg) =>
          messages.push({ id: msg.id, ...msg.data() })
        );
        setMessages(messages);
      });
    }
  }

  useEffect(() => {
    init();
  }, [router.isReady, loading]);

  const sendMessage = async (data) => {
    try {
      console.log(data);
      const { messageInput } = data;

      const message = {
        sender: user.firstName,
        text: messageInput,
        sentAt: serverTimestamp(),
      };

      // const collectionRef = collection(db, "chats", chatId, "messages");
      // const docRef = await addDoc(collectionRef, message);

      // console.log(docRef);

      console.log(message);

      reset();
      setFocus("messageInput");
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

  const MessageInput = () => (
    <form
      class="flex items-center justify-between w-full p-3 border-t border-gray-300"
      onSubmit={handleSubmit(sendMessage)}
    >
      <input
        type="text"
        {...register("messageInput")}
        placeholder="Message"
        className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
      />

      <button type="submit">
        <svg
          class="w-5 h-5 text-gray-500 origin-center transform rotate-90"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>
    </form>
  );

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
      {/* Chats */}
      {/* Message Section */}
      <div className=" flex-1 flex flex-col">
        {/* messages */}
        <div className="overflow-y-auto flex-1 p-4 scrollbar-thin  scrollbar-thumb-gray-300">
          {/* <ul class="space-y-2">
            <YourMessage />
            <YourMessage />
            <MyMessage />
            <MyMessage />
            <MyMessage />
            <YourMessage />
            <YourMessage />
            <YourMessage />
            <MyMessage />
            <MyMessage />
            <YourMessage />
            <YourMessage />
            <YourMessage />
            <YourMessage />
            <MyMessage />
            <MyMessage />
            <MyMessage />
          </ul> */}
          <ul className="space-y-2">
            {messages && messages.map((msg) => <Message text={msg.text} />)}
          </ul>
        </div>
        {/* message input */}
        <div className="w-full ">
          {/* <input type="text" className="w-full py-2 px-4 outline-none" /> */}
          <MessageInput />
        </div>
      </div>
    </div>
  );
}

// const ChatIcon = () => (
//   <li>
//     <a class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-t border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
//       <img
//         class="object-cover w-10 h-10 rounded-full"
//         src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
//         alt="username"
//       />
//       <div class="w-full pb-2">
//         <div class="flex justify-between">
//           <span class="block ml-2 font-semibold text-gray-600">Jhon Don</span>
//           <span class="block ml-2 text-sm text-gray-600">25 minutes</span>
//         </div>
//         <span class="block ml-2 text-sm text-gray-600">bye</span>
//       </div>
//     </a>
//   </li>
// );

// const Chats = () => (
//   <div className=" w-72 max-h-full overflow-hidden border-r border-gray-300">
//     <h2 class="my-2 mb-2 ml-2 text-lg text-gray-600 text-center">Chats</h2>
//     <ul class="overflow-auto  scrollbar-thin">
//       <ChatIcon />
//       <ChatIcon />
//       <ChatIcon />
//     </ul>
//   </div>
// );
