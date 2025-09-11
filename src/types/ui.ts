import type * as React from "react";
import type { VariantProps } from "class-variance-authority";

// Re-export UI props for components to import from a central place

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// The following are helpers to be used alongside the component-local variants
// Consumers: components should import these types and keep variant types local
export type ButtonOwnProps = {
  asChild?: boolean;
};

export type ButtonProps<Variants> = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<Variants> &
  ButtonOwnProps;

export type BadgeProps<Variants> = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<Variants>;


