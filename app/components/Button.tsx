import Image from "next/image";
import React from "react";

interface IButtonProps {
  label?: string;
  image?: string;
  imageAlt?: string;
  style?: string;
  action?: () => void;
  type?: "button" | "submit" | "reset";
  validation?: boolean;
}

function Button(props: IButtonProps) {
  const { label, image, imageAlt, style, action, type, validation } = props;
  return (
    <button
      onClick={action}
      className={style}
      type={type}
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
