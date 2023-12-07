"use client";

import { useFormStatus } from "react-dom";
// import LoadingDots from "./loading-dots";

// Must be used inside a server only form component
export default function SubmitButtonWithFormStatus({
  label = "Submit",
  pendingLabel,
  className,
}: {
  label?: string;
  pendingLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  // console.log({ pending });

  //   const pendingDisplay = pendingLabel ? pendingLabel : <LoadingDots />;
  return (
    <button
      type="submit"
      aria-disabled={pending}
      className={className || ""}
      disabled={pending}
    >
      {label}
    </button>
  );
}
