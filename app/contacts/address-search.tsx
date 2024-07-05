"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useState, useEffect, use } from "react";
import FormInput from "../form-input";

export default function AddressSearch() {
  const [address, setAddress] = useState<string>("");
  const [results, setResults] = useState<Address[]>([]);
  console.log("results: ", results);

  // Trim spaces from each word and then split more than one word into an array
  const addressArray = address.length > 0 ? address.trim().split(" ") : [];

  // Add :* to each word in the array to allow for partial matches
  const formattedAddressArray = addressArray.map((word) => word + ":*");

  // If there is only one word in the array, return that word
  // Otherwise, join the words with an ampersand
  const addressString =
    formattedAddressArray.length === 1
      ? formattedAddressArray[0]
      : formattedAddressArray.join(" & ");
  console.log("addressString: ", addressString);

  useEffect(() => {
    const callSupabase = async () => {
      const supabase = createClientComponentClient<Database>();
      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .textSearch("fts", addressString)
        .limit(5);
      if (error) {
        throw error;
      }
      if (data) {
        setResults(data);
      }
    };
    if (addressString.length >= 3) {
      callSupabase();
    } else {
      setResults([]);
    }
  }, [addressString]);

  return (
    <div>
      <FormInput
        inputProps={{
          name: "address",
          id: "address",
          placeholder: "Address",
          required: true,
          onChange: (e) => {
            setAddress(e.target.value);
          },
        }}
        label="Address"
      />
      <div className="flex flex-col">
        {results.map((result) => {
          return (
            <button key={result.id}>
              <p>{`${result.house_number} ${result.street_name}`}</p>
              <p className="text-sm text-gray-300">{`${result.city}, ${result.state} ${result.zip}`}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
