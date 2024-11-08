import React from "react";
import Button from "./Button";
import { labels } from "../data/labels";

interface IHeaderProps {
  label: string;
}

function Header(props: IHeaderProps) {
  const { label } = props;
  return (
    <header className="bg-[var(--orange)] p-3 flex items-center justify-between">
      <h1 className="text-xl">{label}</h1>
      <nav>
        <Button image="/search.png" imageAlt={labels.searchAlt} />
      </nav>
    </header>
  );
}

export default Header;
