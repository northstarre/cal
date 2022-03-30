import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
import React, { useEffect, useState } from "react";
import { useStripe, useElements, Elements, PaymentElement } from "@stripe/react-stripe-js";
import { GetServerSidePropsContext } from "next";
import { getSession } from "@lib/auth";
import prisma from "@lib/prisma";
import { inferSSRProps } from "@lib/types/inferSSRProps";
import { useRouter } from "next/router";
const stripePromise = loadStripe(
  "pk_test_51KKnHHBjmu6fdZ6OyOnc32x7byECMWMzolqXYjvtkqltuliBeLi8LaA6iBiLyOqvzHVX1hYIKUKaFp4mWw3ycx6r00n5nrzSx2"
);
function CheckoutForm({ credits }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

    if (!clientSecret) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          console.log("payment succeeded");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `https://mynorthstarre-dev.herokuapp.com/payment/paymentConfirmed/?credits=${credits}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <form
      className={"mx-auto mt-28 flex flex-col items-center px-60"}
      id="payment-form"
      onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        className={
          "mt-5 mb-[24px] min-h-[40px] min-w-[240px] max-w-[240px] rounded-full bg-[#379392] font-bold text-white"
        }
        disabled={isLoading || !stripe || !elements}
        id="submit">
        <span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}</span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
export default function CollectPayment(props: inferSSRProps<typeof getServerSideProps>) {
  const [clientSecret, setClientSecret] = useState("");
  const { query } = useRouter();
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`https://northstarre-api.azurewebsites.net/api/Payments/${props.user.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscriptionName: query.subscriptionName }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options: object = {
    clientSecret,
    appearance,
  };
  const getCredits = () => {
    switch (query.subscriptionName) {
      case "sirius":
        return 3;
      case "polaris":
        return 5;
      default:
        return 1;
    }
  };
  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm credits={getCredits()} />
        </Elements>
      )}
    </>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);

  if (!session?.user?.id) {
    return { redirect: { permanent: false, destination: "/auth/login" } };
  }
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      bio: true,
      avatar: true,
      theme: true,
      brandColor: true,
    },
  });

  if (!user) {
    throw new Error("User seems logged in but cannot be found in the db");
  }

  return {
    props: {
      user,
    },
  };
};
