import { useState, useEffect } from "react";
import useCustomAuth from "../customHooks/useCustomAuth";
import { useStripe } from "@stripe/react-stripe-js";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseClient";

import axios from "axios";

export default function BookingRequests() {
  const { user, loading } = useCustomAuth();

  const stripe = useStripe();

  const [bookingRequests, setBoookingRequests] = useState([]);

  useEffect(() => {
    async function init() {
      try {
        console.log("hello");

        let docsRef = await getDocs(collection(db, "bookingRequests"));

        let bookingRequests = [];
        docsRef.forEach((booking) => {
          bookingRequests.push({ id: booking.id, ...booking.data() });
          console.log(booking.data());
        });
        setBoookingRequests(bookingRequests);
      } catch (error) {
        console.log(error);
      }
    }

    init();
  }, []);

  const acceptBooking = async (booking) => {
    try {
      console.log(booking);

      if (user.type !== "tutor") {
        return console.log("bug off, only tutors");
      } else {
        console.log(user.stripeConnectedAccount.id);
        // return;
      }

      // TODO Receive payment intent from backed

      let paymentIntent = await axios.post(
        "http://localhost:5000/payment-method-customer-method",
        {
          paymentMethod: booking.paymentMethod,
          stripeCustomerId: booking.student.stripeCustomerId,
          connectedAccountId: user.stripeConnectedAccount.id,
        }
      );

      paymentIntent = paymentIntent.data;

      console.log(paymentIntent);

      // //   console.log("paymentIntent");
      // //   console.log(paymentIntent);
      // const { client_secret } = paymentIntent;

      // let paymentRes = await stripe.confirmCardPayment(client_secret, {
      //   payment_method: booking.paymentMethod,
      // });
      // if (paymentRes.error) {
      //   console.log(paymentRes.error);
      //   console.log(paymentRes.error.message);
      // } else {
      //   console.log("success");
      //   if (paymentRes.paymentIntent.status === "succeeded") {
      //     console.log("success");
      //   }
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div>Booking Requests</div>
      <div>
        {bookingRequests &&
          bookingRequests.map((booking) => (
            <div
              key={booking.id}
              className="flex gap-4 justify-center items-center p-4  border border-black"
            >
              <div>
                Booking for <span className="font-bold">{booking.subject}</span>{" "}
                by <span className="font-bold">{booking.student.name}</span>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => acceptBooking(booking)}
              >
                Accept
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
