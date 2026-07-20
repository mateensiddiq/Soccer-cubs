import type { ComponentPropsWithoutRef, ElementType } from "react";

type ContainerProps<T extends ElementType> = ComponentPropsWithoutRef<T> & {
  as?: T;
};

export default function Container<T extends ElementType = "div">({
  as,
  className = "",
  ...props
}: ContainerProps<T>) {
  const Component = as || "div";
  return (
    <Component
      className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}
      {...props}
    />
  );
}
