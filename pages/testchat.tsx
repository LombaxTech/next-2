import React from "react";

const ChatIcon = () => (
  <li>
    <a class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-t border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
      <img
        class="object-cover w-10 h-10 rounded-full"
        src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
        alt="username"
      />
      <div class="w-full pb-2">
        <div class="flex justify-between">
          <span class="block ml-2 font-semibold text-gray-600">Jhon Don</span>
          <span class="block ml-2 text-sm text-gray-600">25 minutes</span>
        </div>
        <span class="block ml-2 text-sm text-gray-600">bye</span>
      </div>
    </a>
  </li>
);

const Chats = () => (
  <div className=" w-72 max-h-full overflow-hidden border-r border-gray-300">
    <h2 class="my-2 mb-2 ml-2 text-lg text-gray-600 text-center">Chats</h2>
    <ul class="overflow-auto  scrollbar-thin">
      <ChatIcon />
      <ChatIcon />
      <ChatIcon />
    </ul>
  </div>
);

const MessageInput = () => (
  <div class="flex items-center justify-between w-full p-3 border-t border-gray-300">
    <input
      type="text"
      placeholder="Message"
      class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
      name="message"
      required
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
  </div>
);

export default function TestChat() {
  return (
    <div className=" flex-1 flex max-h-full overflow-hidden">
      {/* Chats */}
      <Chats />
      {/* Message Section */}
      <div className=" flex-1 flex flex-col">
        {/* messages */}
        <div className="overflow-y-auto flex-1 p-4 scrollbar-thin  scrollbar-thumb-gray-300">
          <ul class="space-y-2">
            <li class="flex justify-start">
              <div class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                <span class="block">Hi</span>
              </div>
            </li>
            <li class="flex justify-end">
              <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                <span class="block">Hiiii</span>
              </div>
            </li>
            <li class="flex justify-end">
              <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                <span class="block">how are you?</span>
              </div>
            </li>
            <li class="flex justify-start">
              <div class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                <span class="block">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </span>
              </div>
            </li>
          </ul>
        </div>
        {/* message input */}
        <div className="w-full ">
          {/* <input type="text" className="w-full py-2 px-4 outline-none" /> */}
          <MessageInput />
        </div>
      </div>
    </div>
    // <div class="container mx-auto ">
    //   <div class="min-w-full border rounded lg:grid lg:grid-cols-3 relative flex w-full">
    //     <div class="border-r border-gray-300 lg:col-span-1 absolute left-0 top-0 w-60">
    //       <div class="mx-3 my-3">
    //         <div class="relative text-gray-600">
    //           <span class="absolute inset-y-0 left-0 flex items-center pl-2">
    //             <svg
    //               fill="none"
    //               stroke="currentColor"
    //               stroke-linecap="round"
    //               stroke-linejoin="round"
    //               stroke-width="2"
    //               viewBox="0 0 24 24"
    //               class="w-6 h-6 text-gray-300"
    //             >
    //               <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    //             </svg>
    //           </span>
    //           <input
    //             type="search"
    //             class="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
    //             name="search"
    //             placeholder="Search"
    //             required
    //           />
    //         </div>
    //       </div>

    //       <ul class="overflow-auto h-[32rem]">
    //         <h2 class="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
    //         <li>
    //           <a class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
    //             <img
    //               class="object-cover w-10 h-10 rounded-full"
    //               src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
    //               alt="username"
    //             />
    //             <div class="w-full pb-2">
    //               <div class="flex justify-between">
    //                 <span class="block ml-2 font-semibold text-gray-600">
    //                   Jhon Don
    //                 </span>
    //                 <span class="block ml-2 text-sm text-gray-600">
    //                   25 minutes
    //                 </span>
    //               </div>
    //               <span class="block ml-2 text-sm text-gray-600">bye</span>
    //             </div>
    //           </a>
    //           <a class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out bg-gray-100 border-b border-gray-300 cursor-pointer focus:outline-none">
    //             <img
    //               class="object-cover w-10 h-10 rounded-full"
    //               src="https://cdn.pixabay.com/photo/2016/06/15/15/25/loudspeaker-1459128__340.png"
    //               alt="username"
    //             />
    //             <div class="w-full pb-2">
    //               <div class="flex justify-between">
    //                 <span class="block ml-2 font-semibold text-gray-600">
    //                   Same
    //                 </span>
    //                 <span class="block ml-2 text-sm text-gray-600">
    //                   50 minutes
    //                 </span>
    //               </div>
    //               <span class="block ml-2 text-sm text-gray-600">
    //                 Good night
    //               </span>
    //             </div>
    //           </a>
    //           <a class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
    //             <img
    //               class="object-cover w-10 h-10 rounded-full"
    //               src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
    //               alt="username"
    //             />
    //             <div class="w-full pb-2">
    //               <div class="flex justify-between">
    //                 <span class="block ml-2 font-semibold text-gray-600">
    //                   Emma
    //                 </span>
    //                 <span class="block ml-2 text-sm text-gray-600">6 hour</span>
    //               </div>
    //               <span class="block ml-2 text-sm text-gray-600">
    //                 Good Morning
    //               </span>
    //             </div>
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //     {/* Chat Section */}
    //     <div class="hidden lg:col-span-2 lg:block max-h-full ml-60 flex-1">
    //       <div class="w-full">
    //         {/* Chat Top Bar */}
    //         <div class="relative flex items-center p-3 border-b border-gray-300">
    //           <img
    //             class="object-cover w-10 h-10 rounded-full"
    //             src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
    //             alt="username"
    //           />
    //           <span class="block ml-2 font-bold text-gray-600">Emma</span>
    //           <span class="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
    //         </div>
    //         {/* Chat  Messages */}
    //         <div class="relative w-full p-6 overflow-y-auto h-[40rem]">
    //           <ul class="space-y-2">
    //             <li class="flex justify-start">
    //               <div class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
    //                 <span class="block">Hi</span>
    //               </div>
    //             </li>
    //             <li class="flex justify-end">
    //               <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
    //                 <span class="block">Hiiii</span>
    //               </div>
    //             </li>
    //             <li class="flex justify-end">
    //               <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
    //                 <span class="block">how are you?</span>
    //               </div>
    //             </li>
    //             <li class="flex justify-start">
    //               <div class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
    //                 <span class="block">
    //                   Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    //                 </span>
    //               </div>
    //             </li>
    //           </ul>
    //         </div>

    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
