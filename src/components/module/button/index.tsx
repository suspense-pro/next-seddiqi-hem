import classNames from "classnames";
import Link from "next/link";
import router from "next/router";
import React from "react";

interface ButtonProps {
  title: string;
  type?: string | undefined;
  color?: string | undefined;
  clickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  new_tab?: boolean;
  link?: string;
  isLink?: boolean;
  className?: any
}

const Button: React.FC<ButtonProps> = ({
  title,
  type,
  clickHandler,
  disabled,
  color,
  new_tab,
  link,
  isLink = false,
  className
}) => {

  if (isLink) {
    console.log("className", className, title)
    return (
      <Link
        className={classNames(className, `button`, type?.toLowerCase(), color?.toLowerCase(), disabled && "disabled")}
        href={link || "/"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={className}> {title} </span>
      </Link>
    );
  } else {
    return (
      <button
        className={classNames(`button`, type?.toLowerCase(), color?.toLowerCase())}
        disabled={disabled}
        onClick={clickHandler ? clickHandler : () => router.push(link || "/")}
      >
       <span className={className}>{title}</span>
      </button>
    );
  }
};

export default Button;
