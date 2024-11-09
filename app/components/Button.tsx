import Image from "next/image";
import React from "react";

interface IButtonProps {
  label?: string;
  image?: string;
  imageAlt?: string;
  style?: string;
}

function Button(props: IButtonProps) {
  const { label, image, imageAlt, style } = props;
  return (
    <button className={style}>
      {image && imageAlt && (
        <Image src={image} alt={imageAlt} width={20} height={20} />
      )}

      {label}
    </button>
  );
}

export default Button;
