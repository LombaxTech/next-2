import { useState, useEffect } from "react";
import useCustomAuth from "../customHooks/useCustomAuth";
import axios from "axios";

export default function PaymentMethods() {
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

  const deleteCard = async (card) => {
    try {
      console.log(card);

      let removedPaymentMethod = await axios.post(
        "http://localhost:5000/detach-payment-method",
        { paymentMethodId: card.id }
      );
      removedPaymentMethod = removedPaymentMethod.data;
      console.log(removedPaymentMethod);
      console.log("successfully removed payment method");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <div>Payment Methods</div>
      <div>
        {cards &&
          cards.map((card) => (
            <div
              key={card.id}
              onClick={() => deleteCard(card)}
              className="flex gap-4 border border-black p-4 cursor-pointer rounded-lg"
            >
              <div>**** {card.card.last4}</div>
              <div>
                Expires on: {card.card.exp_month}/{card.card.exp_year}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
