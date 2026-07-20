import type { ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input"> & { label: string };
type TextareaProps = ComponentPropsWithoutRef<"textarea"> & { label: string };
type SelectProps = ComponentPropsWithoutRef<"select"> & { label: string };

const fieldClasses =
  "w-full rounded-2xl border-2 border-brown/15 bg-white px-4 py-3 text-brown placeholder:text-brown-soft/50 focus:outline-none focus:border-orange transition-colors";

export function TextField({ label, id, className = "", ...props }: InputProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="block mb-1.5 font-semibold text-sm text-brown">{label}</span>
      <input id={id} className={`${fieldClasses} ${className}`} {...props} />
    </label>
  );
}

export function TextareaField({ label, id, className = "", ...props }: TextareaProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="block mb-1.5 font-semibold text-sm text-brown">{label}</span>
      <textarea id={id} rows={5} className={`${fieldClasses} ${className}`} {...props} />
    </label>
  );
}

export function SelectField({ label, id, className = "", children, ...props }: SelectProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="block mb-1.5 font-semibold text-sm text-brown">{label}</span>
      <select id={id} className={`${fieldClasses} ${className}`} {...props}>
        {children}
      </select>
    </label>
  );
}
