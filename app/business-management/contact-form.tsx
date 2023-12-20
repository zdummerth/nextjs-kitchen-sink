"use client";
import { createContact } from "@/app/business-management/actions";
import { useRef } from "react";
import { toast } from "react-toastify";
import FormInput from "../form-input";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";

const initialState = {
  name: "",
  email: "",
  phone: "",
  success: false,
  error: false,
};

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

export default function ContactForm() {
  //@ts-expect-error
  const [state, formAction] = useFormState<any>(createContact, initialState);
  const ref = useRef<HTMLFormElement>(null);
  if (state.success) {
    toast.success("Contact Created", {
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
      <div className="flex flex-col gap-4 mb-8">
        <FormInput
          inputProps={{
            name: "name",
            id: "name",
            required: true,
          }}
          label="Name"
        />
        <FormInput
          inputProps={{
            name: "email",
            id: "email",
            placeholder: "you@example.com",
            required: true,
          }}
          label="Email"
        />
        <FormInput
          inputProps={{
            name: "phone",
            id: "phone",
          }}
          label="Phone"
        />
      </div>
      <SubmitButton />
    </form>
  );
}
