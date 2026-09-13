import type { ReactNode } from "react";

const FIELD_CLASSES =
  "w-full rounded-xl border border-mist-300 bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 focus:border-turquoise-500";

export function FormField({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
        {label}
        {required ? <span className="text-gold-600"> *</span> : null}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export const fieldClasses = FIELD_CLASSES;
