import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered";
}

export function Card({
  children,
  className = "",
  variant = "default",
  ...props
}: CardProps) {
  const variants = {
    default: "bg-white rounded-xl shadow-sm border border-gray-200",
    bordered: "bg-white rounded-xl border-2 border-primary-200",
  };

  return (
    <div className={`${variants[variant]} p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}
