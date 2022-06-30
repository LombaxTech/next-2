import { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Image from "next/image";
import { Radio, Stack, RadioGroup } from "@chakra-ui/react";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseClient";

import useCustomAuth from "../customHooks/useCustomAuth";
const STRIPE_SECRET = "sk_test_KxIPs4lg5Yrc8yey28svCIuJ00RTuBa9uJ";

const Cards = ({ paymentMethod, setPaymentMethod }) => {
  const { user, loading } = useCustomAuth();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        console.log(user);
        console.log(user.stripeCustomerId);

        let paymentMethods = await axios.post(
          "http://localhost:5000/payment-methods",
          { customer: user.stripeCustomerId }
        );
        paymentMethods = paymentMethods.data.data;

        let cards = [];
        paymentMethods.forEach((pm) => {
          console.log(pm);
          cards.push(pm);
        });
        // console.log(paymentMethods);
        setCards(cards);
      } catch (error) {
        console.log(error);
      }
    };

    if (!loading && user) {
      init();
    }
  }, [loading, user]);

  const onRadioChange = (v) => {
    setPaymentMethod(v);
  };

  return (
    <div>
      <div className="text-2xl mb-4">Available Payment Methods</div>
      <div>
        <RadioGroup onChange={onRadioChange} value={paymentMethod}>
          <Stack direction="column">
            {cards &&
              cards.map((card) => (
                <Radio value={card.id}>
                  <div
                    key={card.id}
                    className="flex gap-4 border border-black p-4 cursor-pointer rounded-lg"
                  >
                    <div>
                      <Image
                        src="/images/cardLogo.png"
                        width={30}
                        height={20}
                        alt="Logo"
                      />
                    </div>
                    <div>**** {card.card.last4}</div>
                    <div>
                      Expires on: {card.card.exp_month}/{card.card.exp_year}
                    </div>
                  </div>
                </Radio>
              ))}
          </Stack>
        </RadioGroup>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="btn btn-secondary"
          onClick={() => setPaymentMethod(1)}
        >
          Unselect Card
        </button>
      </div>
    </div>
  );
};

export default function FuturePayments() {
  const stripe = useStripe();
  const elements = useElements();

  const { user, loading } = useCustomAuth();
  const [paymentMethod, setPaymentMethod] = useState(1);

  const bookLesson = async () => {
    try {
      console.log("Paying");
      // console.log(user);
      if (paymentMethod != 1) {
        console.log("using a card ");

        console.log(paymentMethod);

        let docRef = await addDoc(collection(db, "bookingRequests"), {
          paymentMethod,
          subject: "Math",
          time: serverTimestamp(),
          student: {
            name: user.firstName,
            email: user.email,
            stripeCustomerId: user.stripeCustomerId,
          },
        });

        console.log(docRef);
        console.log("created booking request");

        return;
      } else {
        console.log("set up card");
        return;

        if (!user.stripeCustomerId)
          return console.log("user stripe customer  does not exist");

        if (elements == null) return;
        const cardElement = elements.getElement("card");

        console.log("you made it here");

        let setupIntent = await axios.post(
          `http://localhost:5000/setup-intent`,
          {
            customerId: user.stripeCustomerId,
          }
        );

        setupIntent = setupIntent.data;
        console.log(setupIntent);

        const { client_secret } = setupIntent;
        console.log(client_secret);

        const paymentMethodReq = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

        console.log(paymentMethodReq.error);
        console.log(paymentMethodReq.paymentMethod);

        let cardSetUpRes = await stripe.confirmCardSetup(client_secret, {
          payment_method: paymentMethodReq.paymentMethod.id,
        });

        console.log(cardSetUpRes);
        let paymentMethodId = cardSetUpRes.setupIntent?.payment_method;
        console.log(paymentMethodId);
        console.log("Success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <div>FuturePayments</div>
      <div className="w-1/2">
        <CardElement options={{ hidePostalCode: true }} />
      </div>
      <Cards
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
      <div>
        <button onClick={bookLesson} className="btn btn-primary">
          Book Lesson
        </button>
      </div>
      <div>
        <span className="font-bold">NOTE: </span> You will only be charged if
        the tutor accepts
      </div>
    </div>
  );
}
