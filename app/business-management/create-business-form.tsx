"use client";
import FormInput, { FormSelect } from "../form-input";
import { useState, useEffect } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import states from "@/states";

export default function NewBusinessForm({ onSubmit }: any) {
  const [address, setAddress] = useState("");
  const [secondaryAddresss, setSecondaryAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const { ref } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    onPlaceSelected: (place) => {
      console.log(place);
      const streetNumber = place.address_components.find((component: any) =>
        component.types.includes("street_number")
      )?.long_name;
      const streetName = place.address_components.find((component: any) =>
        component.types.includes("route")
      )?.long_name;
      const locality = place.address_components.find((component: any) =>
        component.types.includes("locality")
      )?.long_name;
      const stateInput = place.address_components.find((component: any) =>
        component.types.includes("administrative_area_level_1")
      )?.long_name;
      const zip = place.address_components.find((component: any) =>
        component.types.includes("postal_code")
      )?.long_name;

      const zipSuffix = place.address_components.find((component: any) =>
        component.types.includes("postal_code_suffix")
      )?.long_name;
      streetNumber && streetName && setAddress(`${streetNumber} ${streetName}`);
      locality && setCity(locality);
      setState(stateInput);
      setZip(`${zip}${zipSuffix ? `-${zipSuffix}` : ""}`);
    },
    options: {
      types: ["address"],
      componentRestrictions: { country: "us" },
    },
  });

  useEffect(() => {
    console.log(address);
    if (!ref.current) return;
    // @ts-ignore
    ref.current.value = address;
  }, [ref, address, city, state, zip]);
  return (
    <div>
      <div className="p-4">
        <h1>Add New Business</h1>

        <form
          // action={formAction}
          className="border border-gray-800 border-t-0 p-2"
        >
          <div className="flex flex-col">
            <label
              htmlFor="address"
              className="text-gray-700 dark:text-gray-200 text-sm mb-1"
            >
              Address
            </label>
            <input
              // @ts-ignore
              ref={ref}
              name="address"
              id="address"
              required={true}
              type="text"
              // value={address}
              // onChange={(e) => setAddress(e.target.value)}
              className="border-[1px] border-gray-700/25 dark:border-gray-200/50 rounded bg-gray-100 dark:bg-gray-600 leading-loose placeholder-gray-500 px-2 h-10"
            />
            <FormInput
              inputProps={{
                name: "secondary_address",
                id: "secondary_address",
                placeholder: "Apt., suite, etc. (optional)",
                value: secondaryAddresss,
                onChange: (e) => setSecondaryAddress(e.target.value),
              }}
              label="Secondary Address"
            />
            <FormInput
              inputProps={{
                name: "city",
                id: "city",
                placeholder: "City",
                required: true,
                value: city,
                onChange: (e) => setCity(e.target.value),
              }}
              label="City"
            />
            <div className="flex w-full gap-2">
              <FormSelect
                inputProps={{
                  name: "state",
                  id: "state",
                  placeholder: "State",
                  required: true,
                  value: state,
                  onChange: (e) => {
                    setState(e.target.value);
                  },
                }}
                label="State"
                wrapperClassname="flex-1 min-w-0 bg-inherit"
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </FormSelect>
              <FormInput
                inputProps={{
                  name: "zip",
                  id: "zip",
                  placeholder: "Zip",
                  required: true,
                  value: zip,
                  onChange: (e) => setZip(e.target.value),
                }}
                label="Zip"
                wrapperClassname="flex-1 min-w-0"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 mt-2 w-full"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
