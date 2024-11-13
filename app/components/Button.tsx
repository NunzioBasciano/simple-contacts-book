import Image from "next/image";
import React from "react";

interface IButtonProps {
  label?: string;
  image?: string;
  imageAlt?: string;
  style?: string;
  action?: () => void;
  type?: "button" | "submit" | "reset"; // Aggiunto tipo per la sicurezza
  validation?: boolean;
}

function Button(props: IButtonProps) {
  const {
    label,
    image,
    imageAlt,
    style,
    action,
    type = "button",
    validation,
  } = props; // Default type to 'button'

  return (
    <button
      type={type}
      onClick={action}
      className={style}
      disabled={validation}
    >
      {image && imageAlt && (
        <Image src={image} alt={imageAlt} width={20} height={20} />
      )}
      {label}
    </button>
  );
}

export default Button;
