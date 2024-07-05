"use client";
import React from "react";
import { usePlacesWidget } from "react-google-autocomplete";

export default function AddressSearchInput(
  inputProps: React.InputHTMLAttributes<HTMLInputElement>
) {
  const { ref } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    options: {
      types: ["address"],
      componentRestrictions: { country: "us" },
    },
  });

  return (
    <input
      // @ts-ignore
      ref={ref}
      {...inputProps}
    />
  );
}
