"use client";
import { createContact, updateContact } from "@/app/contacts/actions";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import AddressSearchInput from "./address-search-input";
import {
  UserCircleIcon,
  GlobeAltIcon,
  AtSymbolIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

const initialState = { message: null, errors: {} };

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 mt-2 w-full"
      disabled={pending}
    >
      {pending ? "Submitting..." : "Save"}
    </button>
  );
};

function ErrorMessage({ state, field }: { state: any; field: string }) {
  return (
    <div id={`${field}-error`} aria-live="polite" aria-atomic="true">
      {state.errors?.[field] &&
        state.errors[field].map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        ))}
    </div>
  );
}

export default function ContactForm({ contact }: { contact?: Contact }) {
  const action = contact ? updateContact.bind(null, contact.id) : createContact;
  //@ts-expect-error
  const [state, dispatch] = useFormState(action, initialState);
  const ref = useRef<HTMLFormElement>(null);

  return (
    <>
      <form
        ref={ref}
        action={dispatch}
        className="border border-gray-800 border-t-0"
      >
        {/* Contact Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
                defaultValue={contact?.name || ""}
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <ErrorMessage state={state} field="name" />
          </div>
        </div>

        {/* Contact Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Enter email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
                defaultValue={contact?.email || ""}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <ErrorMessage state={state} field="email" />
          </div>
        </div>

        {/* Contact Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            Phone
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="Enter phone"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="phone-error"
                defaultValue={contact?.phone || ""}
              />
              <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <ErrorMessage state={state} field="phone" />
          </div>
        </div>

        {/* Contact Address */}
        <div className="mb-4">
          <label htmlFor="address" className="mb-2 block text-sm font-medium">
            Address
          </label>
          <div className="relative">
            <AddressSearchInput
              name="address"
              id="address"
              required={true}
              type="text"
              defaultValue={contact?.address || ""}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <GlobeAltIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <ErrorMessage state={state} field="address" />
        </div>
        <SubmitButton />
      </form>
    </>
  );
}
