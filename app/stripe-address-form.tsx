"use client";
import React from "react";
import { AddressElement } from "@stripe/react-stripe-js";
import { Elements, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripe = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY as string
);

const Form = () => {
  const elements = useElements();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!elements) return;
    const addressElement = elements.getElement("address");
    if (!addressElement) return;

    const { complete, value } = await addressElement.getValue();

    if (complete) {
      console.log(value);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <AddressElement
        options={{
          mode: "billing",
          allowedCountries: ["US"],
          display: {
            name: "organization",
          },
          autocomplete: {
            mode: "google_maps_api",
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
          },
        }}
      />
      <button type="submit" className="bg-blue-500 p-2 rounded-lg mt-8">
        Submit
      </button>
    </form>
  );
};

const ElementsWrapper = () => {
  return (
    <Elements stripe={stripe}>
      <Form />
    </Elements>
  );
};

const StripeAddressForm = () => <ElementsWrapper />;

export default StripeAddressForm;
