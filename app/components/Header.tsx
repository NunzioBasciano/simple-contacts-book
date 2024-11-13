import React from "react";

interface IHeaderProps {
  label: string;
}

function Header(props: IHeaderProps) {
  const { label } = props;
  return (
    <header className="bg-[var(--orange)] p-3 flex items-center justify-between w-full">
      <div className="w-full max-w-[1200px] mx-auto">
        <h1 className="text-xl">{label}</h1>
      </div>
    </header>
  );
}

export default Header;
