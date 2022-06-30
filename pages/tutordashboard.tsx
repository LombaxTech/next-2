import { useState, useEffect } from "react";
import useCustomAuth from "../customHooks/useCustomAuth";

import { useRouter } from "next/router";

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
      </div>
    );
}
