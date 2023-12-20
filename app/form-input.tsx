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
      <label htmlFor={inputProps.id} className="text-gray-600 text-sm mb-1">
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
  label,
  wrapperClassname,
  inputProps,
}: {
  // inputProps: any;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  label: string;
  wrapperClassname?: string;
}) {
  return (
    <div className={`flex flex-col ${wrapperClassname ?? ""}`}>
      <label
        htmlFor={inputProps.id}
        className="text-gray-700 dark:text-gray-200 text-sm mb-1"
      >
        {label}
      </label>
      <input
        className={`border-[1px] border-gray-700/25 dark:border-gray-200/50 rounded bg-gray-100 dark:bg-gray-600 leading-loose placeholder-gray-500 px-2 h-10 ${
          inputProps.className ?? ""
        }`}
        {...inputProps}
      />
    </div>
  );
}
