"use client";
import { useFormState } from "react-dom";
import { updateTicket, createTicket } from "../actions";
import { useFormStatus } from "react-dom";
import { radioClassName } from "@/components/forms/text-input";
import {
  UserCircleIcon,
  GlobeAltIcon,
  AtSymbolIcon,
  PhoneIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";

const initialState = { message: null, errors: {} };

const categories = [
  "Hardware Problem",
  "Software Problem",
  "Application Development",
  "Project",
];

const priorities = [1, 2, 3, 4, 5];

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
      {state?.error?.[field] && (
        <p className="mt-2 text-sm text-red-500">{state.error[field]}</p>
      )}
    </div>
  );
}

const TicketForm = ({ ticket }: { ticket?: Ticket }) => {
  const action = ticket ? updateTicket.bind(null, ticket.id) : createTicket;
  //@ts-ignore
  const [state, dispatch] = useFormState(action, initialState);

  return (
    <form action={dispatch}>
      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="mb-2 block text-sm font-medium">
          Title
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter title"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="title-error"
            defaultValue={ticket?.title || ""}
          />
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          <ErrorMessage state={state} field="title" />
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <label htmlFor="description" className="mb-2 block text-sm font-medium">
          Description
        </label>
        <div className="relative mt-2 rounded-md">
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="description-error"
            defaultValue={ticket?.description || ""}
            rows={5}
          />
          <ErrorMessage state={state} field="description" />
        </div>
      </div>

      {/* Category */}
      <div className="mb-4">
        <label htmlFor="category" className="mb-2 block text-sm font-medium">
          Category
        </label>
        <div className="relative mt-2 rounded-md">
          <select
            id="category"
            name="category"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={ticket?.category || ""}
            aria-describedby="category-error"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <GlobeAltIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          <ErrorMessage state={state} field="category" />
        </div>
      </div>

      {/* Priority */}
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">Priority</label>
        <div className="relative mt-2 rounded-md">
          <div className="flex gap-6 flex-wrap">
            {priorities.map((priority) => (
              <div key={priority} className="flex gap-x-2">
                <input
                  id={`priority-${priority}`}
                  name="priority"
                  type="radio"
                  value={priority}
                  defaultChecked={ticket?.priority === priority}
                  className={radioClassName}
                />
                <label htmlFor={`priority-${priority}`}>{priority}</label>
              </div>
            ))}
          </div>
          <ErrorMessage state={state} field="priority" />
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <label htmlFor="progress" className="mb-2 block text-sm font-medium">
          Progress
        </label>
        <input
          type="range"
          id="progress"
          name="progress"
          min="0"
          max="100"
          defaultValue={ticket?.progress || 0}
          className="w-full"
        />
      </div>

      {/* Status */}
      <div className="mb-4">
        <label htmlFor="status" className="mb-2 block text-sm font-medium">
          Status
        </label>
        <div className="relative mt-2 rounded-md">
          <select
            id="status"
            name="status"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={ticket?.status || "not started"}
            aria-describedby="status-error"
          >
            <option value="not started">Not Started</option>
            <option value="started">Started</option>
            <option value="done">Done</option>
          </select>
          <GlobeAltIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          <ErrorMessage state={state} field="status" />
        </div>
      </div>

      <SubmitButton />
    </form>
  );
};

export default TicketForm;
