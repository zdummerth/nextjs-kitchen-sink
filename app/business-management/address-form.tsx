"use client";
import { createAddresss } from "@/app/business-management/actions";
import { useRef } from "react";
import { toast } from "react-toastify";
import FormInput, { FormSelect } from "../form-input";
import states from "@/states";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";

const initialState = {
  line1: "",
  line2: "",
  city: "St. Louis",
  state: "Missouri",
  zip: "",
  success: false,
  error: false,
};

export default function AdressForm() {
  //@ts-expect-error
  const [state, formAction] = useFormState<any>(createAddresss, initialState);
  const ref = useRef<HTMLFormElement>(null);
  if (state.success) {
    toast.success("Address saved", {
      autoClose: 1500,
    });
    ref.current?.reset();
  }
  return (
    <form
      ref={ref}
      action={formAction}
      className="border border-gray-800 border-t-0 p-2"
    >
      <div className="flex flex-col">
        <FormInput
          inputProps={{
            name: "house_number",
            id: "house_number",
            placeholder: "1234",
            required: true,
          }}
          label="House Number"
        />
        <FormInput
          inputProps={{
            name: "street_name",
            id: "street_name",
            placeholder: "Street",
            required: true,
          }}
          label="Street Name"
        />
        <FormInput
          inputProps={{
            name: "secondary_address",
            id: "secondary_address",
            placeholder: "Apt., suite, etc. (optional)",
          }}
          label="Secondary Address"
        />
        <FormInput
          inputProps={{
            name: "city",
            id: "city",
            placeholder: "City",
            defaultValue: "St. Louis",
            required: true,
          }}
          label="City"
        />
        <div className="flex w-full gap-2">
          <FormSelect
            inputProps={{
              name: "state",
              id: "state",
              placeholder: "State",
              defaultValue: "Missouri",
              required: true,
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
  );
}
