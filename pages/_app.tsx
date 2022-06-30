import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import Navbar from "../components/Navbar";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const publishableKey = "pk_test_bE9nvfRJJMLP3geLvcp4RBhU00cZUCPk1n";
const stripePromise = loadStripe(publishableKey);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Elements stripe={stripePromise}>
      <ChakraProvider>
        {/* <div
          data-theme="night"
          className="max-h-screen min-h-screen flex flex-col"
        > */}
        <div className="max-h-screen min-h-screen flex flex-col">
          {/* <div > */}
          {/* <div className="sticky top-0 z-50"> */}
          {/* <div className=""> */}
          <Navbar />
          {/* </div> */}
          <div className="flex-1 overflow-y-auto flex flex-col">
            <Component {...pageProps} />
          </div>
        </div>
      </ChakraProvider>
    </Elements>
  );
}

export default MyApp;
