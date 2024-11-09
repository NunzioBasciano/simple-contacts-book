import React from "react";
import Button from "./Button";
import { labels } from "../data/label";

interface IHeaderProps {
  label: string;
}

function Header(props: IHeaderProps) {
  const { label } = props;
  return (
    <header className="bg-[var(--orange)] p-3 flex items-center justify-between">
      <h1 className="text-xl">{label}</h1>
      <Button image="/search.png" imageAlt={labels.searchAlt} />
    </header>
  );
}

export default Header;
