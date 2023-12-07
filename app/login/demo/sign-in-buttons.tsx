import SubmitButtonWithFormStatus from "@/components/submit-button-with-form-status";
import { loginUser } from "../actions";
const DEMO_USER_PASSWORD = "example-password";
const DEMO_USERS = [
  {
    username: "john-doe",
    email: "john-doe@demo.com",
    label: "John Doe",
  },
  {
    username: "tracy-doe",
    email: "tracy-doe@demo.com",
    label: "Tracy Doe",
  },
  {
    username: "peter-doe",
    email: "peter-doe@demo.com",
    label: "Peter Doe",
  },
];

export default async function SignInButtons() {
  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="mb-8 text-2xl font-semibold">Select A Demo User</h1>
      <div className="flex flex-col gap-4">
        {DEMO_USERS.map((user) => (
          <form action={loginUser} key={user.username}>
            <input type="hidden" name="email" value={user.email} />
            <input type="hidden" name="password" value={DEMO_USER_PASSWORD} />
            <SubmitButtonWithFormStatus
              label={user.label}
              className="bg-emerald-700 hover:bg-emerald-500 p-4 rounded-xl"
            />
          </form>
        ))}
      </div>
    </div>
  );
}
