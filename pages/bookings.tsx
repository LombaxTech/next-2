import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseApp, db } from "../firebase/firebaseClient";
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  onSnapshot,
  collection,
  addDoc,
} from "firebase/firestore";

const auth = getAuth(firebaseApp);
const BACKEND = "http://localhost:5000";

export default function Bookings() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [authUser, authUserLoading, error] = useAuthState(auth);
  const [firestoreUser, setFirestoreUser] = useState(null);

  const [bookings, setBookings] = useState([]);

  async function init() {
    if (!authUserLoading && authUser) {
      try {
        onSnapshot(doc(db, "users", authUser.uid), (userDoc) =>
          setFirestoreUser(userDoc.data())
        );

        onSnapshot(collection(db, "bookings"), (bookingsSnapshot) => {
          let bookings = [];

          bookingsSnapshot.forEach((bookingDoc) => {
            // console.log(bookingDoc.data().bookingTime.toDate());

            const bookingTime = bookingDoc.data().bookingTime.toDate();
            // console.log(bookingTime);

            let booking = {
              ...bookingDoc.data(),
              id: bookingDoc.id,
              bookingTime,
            };

            bookings.push(booking);
            bookings.sort((a, b) => a.bookingTime - b.bookingTime);
          });
          setBookings(bookings);
          //   console.log(bookingsSnapshot.size);
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    init();
  }, [authUser, authUserLoading]);

  if (loading)
    return (
      <div className="flex justify-center mt-8">
        <Spinner />
      </div>
    );

  if (firestoreUser && bookings)
    return (
      <div className="flex flex-col items-center justify-center mt-8">
        <h1>bookings</h1>
        <button onClick={() => console.log(bookings)}>View Bookings</button>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <div className="block">
              Booking Time: {booking.bookingTime.toString()}
            </div>
            <div className="font-extrabold">
              {/* Google Meet Link: {booking.googleMeetLink} */}
              <button
                className="bg-green-300 px-6 py-2 font-bold text-white rounded-md hover:bg-green-700"
                onClick={() => router.push(booking.googleMeetLink)}
              >
                Start Class
              </button>
            </div>
          </li>
        ))}
      </div>
    );
}
