import React, { useState, useEffect } from "react";
import {
  CardElement,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const STRIPE_SECRET = "sk_test_KxIPs4lg5Yrc8yey28svCIuJ00RTuBa9uJ";

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();

  async function pay() {
    try {
      console.log("trying to pay");

      if (elements == null) return;

      const cardElement = elements.getElement("card");

      let paymentIntent = await axios.post(
        `http://localhost:5000/create-payment-intent`
      );

      console.log(paymentIntent.data);

      const { client_secret } = paymentIntent.data;
      // return;

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      console.log(paymentMethodReq.error);
      console.log(paymentMethodReq.paymentMethod);
      // console.log({ error, paymentMethod });

      const { error } = await stripe.confirmCardPayment(client_secret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      });

      console.log(error);
    } catch (error) {
      console.log("error trying to pay");
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="p-4 w-1/2  my-4">
        <CardElement options={{ hidePostalCode: true }} />
        {/* <PaymentElement /> */}
      </div>
      <button
        onClick={pay}
        className="bg-red-500 px-6 py-2 text-white rounded-md"
      >
        Pay
      </button>
      {/* </div> */}
    </div>
  );
}
