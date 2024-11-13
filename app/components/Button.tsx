import Image from "next/image";
import React from "react";

interface IButtonProps {
  label?: string;
  image?: string;
  imageAlt?: string;
  style?: string;
  action?: () => void;
<<<<<<< HEAD
  type?: "button" | "submit" | "reset"; // Aggiunto tipo per la sicurezza
=======
  type?: "button" | "submit" | "reset";
>>>>>>> dev2
  validation?: boolean;
}

function Button(props: IButtonProps) {
<<<<<<< HEAD
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
=======
  const { label, image, imageAlt, style, action, type, validation } = props;
  return (
    <button
      onClick={action}
      className={style}
      type={type}
>>>>>>> dev2
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
