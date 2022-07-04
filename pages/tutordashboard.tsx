import { useState, useEffect } from "react";
import useCustomAuth from "../customHooks/useCustomAuth";

import { useRouter } from "next/router";
import axios from "axios";

import { Tooltip } from "@chakra-ui/react";

export default function TutorDashboard() {
  const router = useRouter();
  const { user, loading } = useCustomAuth();

  useEffect(() => {
    async function init() {
      try {
        if (user) {
          console.log(user);

          if (user.type !== "tutor") {
            return console.log("TUTORS ONLY, BUZZ OFF");
          }

          if (!user.stripeConnectedAccount.setupComplete) {
            console.log("you need to complete your set up");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    init();
  }, [loading, user]);

  const onboardAccount = async () => {
    try {
      // TODO get onboarding link from backend and redirect user
      // ...
      let linkRes = await axios.post(
        `http://localhost:5000/onboarding/${user.stripeConnectedAccount.id}`
      );
      linkRes = linkRes.data;
      const { url } = linkRes;
      router.push(url);
    } catch (error) {
      console.log(error);
    }
  };

  const goToStripeDashboard = async () => {
    try {
      let loginLinkRes = await axios.post(
        `http://localhost:5000/loginlink/${user.stripeConnectedAccount.id}`
      );
      loginLinkRes = loginLinkRes.data;
      const { url } = loginLinkRes;
      // router.push(url);
      window.open(url, "_blank").focus();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <h1>Loading...</h1>;

  if (user)
    return (
      <div className="flex flex-col justify-center items-center">
        <div>Tutor Dashboard</div>
        <div>
          {user.stripeConnectedAccount.setupComplete ? (
            <div>Your account is active</div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="font-bold">Your account is not active!</div>
              <div>Complete the following to activate your account</div>
              <button className="btn btn-primary" onClick={onboardAccount}>
                Set Up Bank Details
              </button>
            </div>
          )}
        </div>
        <div>
          <button
            className="btn btn-secondary my-4"
            onClick={goToStripeDashboard}
          >
            View Your Stripe Dashboard
          </button>
          <Tooltip label="Stripe is a world famouse payment management tool. Using the dashboard you can view your invoices.">
            <div className="font-light text-gray-600 text-center cursor-pointer">
              What is my Stripe Dashboard?
            </div>
          </Tooltip>
        </div>
      </div>
    );
}
