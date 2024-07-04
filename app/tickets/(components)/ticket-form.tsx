"use client";
import { useFormState } from "react-dom";
import { upsertTicket } from "../actions";
import TextInput, {
  inputClassName,
  radioClassName,
} from "@/components/forms/text-input";
import { SubmitButton } from "./submit-button";
type FormTicket = {
  [K in keyof Ticket]: K extends "id" ? string | number : Ticket[K];
};

const initialState = {
  error: null,
  success: null,
};

const TicketForm = ({ ticket }: { ticket: FormTicket }) => {
  const EDITMODE = ticket.id === "new" ? false : true;

  //@ts-ignore
  const [state, formAction] = useFormState(upsertTicket, initialState);

  const categories = [
    "Hardware Problem",
    "Software Problem",
    "Application Development",
    "Project",
  ];

  return (
    <div className="flex flex-col items-center">
      <form action={formAction} className="flex flex-col gap-3 w-3/4 max-w-lg">
        <h3>{EDITMODE ? "Update Your Ticket" : "Create New Ticket"}</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          required={true}
          defaultValue={ticket.title}
          className={inputClassName}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          required={true}
          rows={5}
          defaultValue={ticket.description}
          className={inputClassName}
        />
        <label>Category</label>
        <select
          name="category"
          defaultValue={ticket.category}
          className={inputClassName}
        >
          {categories?.map((category, _index) => (
            <option key={_index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label>Priority</label>
        <div className="flex gap-6 flex-wrap">
          {[1, 2, 3, 4, 5].map((priority) => (
            <div key={priority} className="flex gap-x-2">
              <input
                id={`priority-${priority}`}
                name="priority"
                type="radio"
                value={priority}
                defaultChecked={ticket.priority === priority}
                className={radioClassName}
              />
              <label>{priority}</label>
            </div>
          ))}
        </div>
        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          min="0"
          max="100"
          defaultValue={ticket.progress}
        />
        <label>Status</label>
        <select
          name="status"
          defaultValue={ticket.status}
          className={inputClassName}
        >
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>
        <input type="hidden" name="id" value={ticket.id} />
        <SubmitButton label={EDITMODE ? "Update Ticket" : "Create Ticket"} />
      </form>
      {/* @ts-ignore */}
      {state?.error && <p>{state?.error}</p>}
    </div>
  );
};

export default TicketForm;
