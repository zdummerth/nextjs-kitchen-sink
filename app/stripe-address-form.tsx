import React from "react";
import { AddressElement } from "@stripe/react-stripe-js";

const AddressForm = () => {
  return (
    <form>
      <h3>Billing</h3>
      <AddressElement
        options={{
          mode: "shipping",
          allowedCountries: ["US"],
          display: {
            name: "organization",
          },
          defaultValues: {
            address: {
              state: "MO",
              city: "St. Louis",
              country: "US",
            },
          },
          //   autocomplete: {
          //     mode: "google_maps_api",
          //     apiKey: process.env.GOOGLE_MAPS_API_KEY as string,
          //   },
        }}
        onChange={(event) => {
          if (event.complete) {
            // Extract potentially complete address
            const address = event.value.address;
            console.log(address);
          }
        }}
      />
    </form>
  );
};

export default AddressForm;
