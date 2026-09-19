import type { ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input"> & { label: string };
type TextareaProps = ComponentPropsWithoutRef<"textarea"> & { label: string };
type SelectProps = ComponentPropsWithoutRef<"select"> & { label: string };

const fieldClasses =
  "w-full rounded-2xl border border-brown/40 bg-white px-4 py-3.5 text-brown placeholder:text-brown-soft/60 transition-[border-color,box-shadow] duration-200 focus:outline-none focus:border-action focus:ring-4 focus:ring-action/15";

export function TextField({ label, id, className = "", ...props }: InputProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="block mb-1.5 font-bold text-sm text-brown">{label}</span>
      <input id={id} className={`${fieldClasses} ${className}`} {...props} />
    </label>
  );
}

export function TextareaField({ label, id, className = "", ...props }: TextareaProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="block mb-1.5 font-bold text-sm text-brown">{label}</span>
      <textarea id={id} rows={5} className={`${fieldClasses} ${className}`} {...props} />
    </label>
  );
}

export function SelectField({ label, id, className = "", children, ...props }: SelectProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="block mb-1.5 font-bold text-sm text-brown">{label}</span>
      <select id={id} className={`${fieldClasses} ${className}`} {...props}>
        {children}
      </select>
    </label>
  );
}

// Invisible spam trap: real visitors never see or reach this field (it's
// positioned off-screen, not display:none, and skipped from tab order and
// screen readers), but simple bots that blindly fill every input will
// trip it. The matching server action checks it and silently drops the
// submission. Keep the field `name` as "website" — a name bots commonly
// look for and fill on their own.
export function Honeypot() {
  return (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
    />
  );
}
