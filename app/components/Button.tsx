import Image from "next/image";
import React from "react";

interface IButtonProps {
  label?: string;
  image?: string;
  imageAlt?: string;
}

function Button(props: IButtonProps) {
  const { label, image, imageAlt } = props;
  return (
    <button>
      {image && imageAlt && (
        <Image
          src={image}
          alt={imageAlt}
          width={20}
          height={20}
          objectFit="cover"
        />
      )}

      {label}
    </button>
  );
}

export default Button;
