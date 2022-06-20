import { useRouter } from "next/router";
import { useEffect } from "react";

import useCustomAuth from "../customHooks/useCustomAuth";

export default function protectedpage() {
  const router = useRouter();
  const { user, loading } = useCustomAuth();

  if (loading) return <h1>Loading...</h1>;
  if (!loading) {
    return <div>protected</div>;
  }
}
