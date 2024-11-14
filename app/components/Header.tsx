import React from "react";

interface IHeaderProps {
  label: string;
}

function Header(props: IHeaderProps) {
  const { label } = props;
  return (
    <header className="bg-[var(--orange)] p-3 flex items-center justify-center w-full h-[60px]">
      <h1 className="text-xl">{label}</h1>
    </header>
  );
}

export default Header;
