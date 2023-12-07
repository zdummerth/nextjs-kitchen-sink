import { InputHTMLAttributes } from "react";
export function FormSelect({
  inputProps,
  label,
  wrapperClassname,
  children,
}: {
  inputProps: InputHTMLAttributes<HTMLSelectElement>;
  label: string;
  wrapperClassname?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col ${wrapperClassname ?? ""}`}>
      <label htmlFor={inputProps.id} className="text-gray-300 text-sm mb-1">
        {label}
      </label>
      <select
        className={`bg-gray-900 border border-gray-300 border rounded leading-loose placeholder-gray-500 px-2 h-10 ${
          inputProps.className ?? ""
        }`}
        {...inputProps}
      >
        {children}
      </select>
    </div>
  );
}
export default function FormInput({
  inputProps,
  label,
  wrapperClassname,
}: {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  label: string;
  wrapperClassname?: string;
}) {
  return (
    <div className={`flex flex-col ${wrapperClassname ?? ""}`}>
      <label htmlFor={inputProps.id} className="text-gray-300 text-sm mb-1">
        {label}
      </label>
      <input
        className={`border rounded bg-inherit leading-loose placeholder-gray-500 px-2 h-10 ${
          inputProps.className ?? ""
        }`}
        {...inputProps}
      />
    </div>
  );
}
