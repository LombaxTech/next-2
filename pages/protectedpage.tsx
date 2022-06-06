import { useRouter } from "next/router";

import { getAuth } from "firebase/auth";
import { firebaseApp } from "../firebase/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";

const auth = getAuth(firebaseApp);

export default function protectedpage() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <h1>Loading...</h1>;
  if (!loading && !user) router.push("/login");
  if (!loading && user) {
    return <div>protected</div>;
  }
}
