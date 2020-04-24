import React from "react";

export enum TextAlign {
  left = "left",
  center = "center",
  right = "right",
}

export enum TextType {
  normal = "normal",
  bold = "bold",
}

export enum TextSize {
  small = "small",
  medium = "medium",
  large = "large",
}

interface IText {
  children: string | (string | JSX.Element)[] | JSX.Element;
  size?: TextSize;
  type?: TextType;
  align?: TextAlign;
  className?: string;
  onClick?: () => any;
}

function Text({
  children,
  size = TextSize.medium,
  type = TextType.normal,
  align = TextAlign.left,
  className = '',
  ...rest
}: IText) {
  const classNames = `text-${size} font-${type} align-${align} ${className}`;
  return <p className={classNames} {...rest}>{children}</p>;
}

export default Text;
