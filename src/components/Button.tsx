import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-action text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_10px_22px_-10px_rgb(184_84_0/0.75)] hover:bg-action-deep hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_14px_26px_-10px_rgb(150_67_10/0.8)] active:translate-y-0 active:scale-[0.98]",
  secondary:
    "bg-yellow text-brown shadow-[inset_0_1px_0_rgb(255_255_255/0.5),0_10px_22px_-12px_rgb(51_32_15/0.35)] hover:bg-yellow-soft hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
  outline:
    "bg-white text-brown border-2 border-brown/15 hover:border-action hover:text-action hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
  ghost: "bg-transparent text-brown hover:bg-cream-dark",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-heading font-bold px-6 py-3 text-base transition-[transform,box-shadow,background-color,color,border-color] duration-200 ease-out whitespace-nowrap";

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: Variant;
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none cursor-pointer ${className}`}
      {...props}
    />
  );
}
