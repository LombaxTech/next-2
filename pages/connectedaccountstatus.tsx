import { useState, useEffect } from "react";

import useCustomAuth from "../customHooks/useCustomAuth";
import axios from "axios";
import { areIntervalsOverlapping } from "date-fns/esm";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseClient";

export default function ConnectedAccountStatus() {
  const { user, loading } = useCustomAuth();

  useEffect(() => {
    async function init() {
      try {
        if (!user) return;
        if (user.type !== "tutor") return console.log("buzz off");

        // TODO: Get user connected account + check details;
        const connectedAccountId = user.stripeConnectedAccount.id;
        console.log(connectedAccountId);

        let connectAccount = await axios.get(
          `http://localhost:5000/connected-account/${connectedAccountId}`
        );
        connectAccount = connectAccount.data;
        console.log(connectAccount);

        const { details_submitted, payouts_enabled, charges_enabled } =
          connectAccount;

        console.log({ details_submitted, payouts_enabled, charges_enabled });

        // details_submitted to see if onboarding process
        if (!details_submitted) console.log("details not submitted");
        if (!payouts_enabled) console.log("payouts not enabled");
        if (!charges_enabled) console.log("charges not enabled");

        if (details_submitted && payouts_enabled && charges_enabled) {
          // console.log("everything is set up!");
          if (user.active && user.stripeConnectedAccount.setupComplete)
            return console.log("already active");

          const userRef = doc(db, "users", user.uid);
          let updateRes = await updateDoc(userRef, {
            active: true,
            "stripeConnectedAccount.setupComplete": true,
          });

          console.log(updateRes);
          console.log("successfully updated");
        }

        console.log(user);
      } catch (error) {
        console.log(error);
      }
    }

    init();
  }, [user, loading]);

  return (
    <div>
      <div> ConnectedAccountStatus</div>
    </div>
  );
}
