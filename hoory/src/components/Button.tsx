import React from "react";

export enum ButtonSize {
  small = "small",
  medium = "medium",
  large = "large",
}

export enum ButtonTypes {
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary"
}

interface IButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: ButtonTypes;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
}

function Button({
  children,
  type = ButtonTypes.primary,
  size = ButtonSize.small,
  loading = false,
  className = '',
  ...rest
}: IButtonProps) {
  return (
    <button className={`button-${type} btn-${size} ${className}`} onClick={rest.onClick}>
      {(loading) ? "Loading..." : children}
    </button>
  );
}

export default Button;
