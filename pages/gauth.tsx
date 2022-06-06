import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Gauth() {
  const router = useRouter();
  const code = router.query["code"];
  const BACKEND = "http://localhost:5000";

  const [name, setName] = useState("");

  // async function init() {
  //   if (router.isReady) {
  //     console.log("logging query...");
  //     console.log(router.query);
  //     const { code } = router.query;
  //     console.log(code);

  //     if (code != "") {
  //       try {
  //       } catch (error) {
  //         console.log(error);
  //       }
  //       let tokens = await axios.post(`${BACKEND}/gen-tokens`, { code });
  //       tokens = tokens.data;
  //       console.log(tokens);
  //     }
  //   }
  // }

  // useEffect(() => {
  //   init();
  // }, [router.isReady]);

  const createGAuth = async () => {
    try {
      // TODO: Get Auth Url
      let res = await axios.get(`${BACKEND}/gen-auth-link`);
      const url = res.data;
      console.log({ url });
      router.push(url);
      // window.open(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center">
      {/* <h1>G Auth</h1> */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-8"
        onClick={createGAuth}
      >
        Create G authed account
      </button>
      {/* <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /> */}
    </div>
  );
}
