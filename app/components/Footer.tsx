"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MenuLink from "./MenuLink";

function Footer() {
  const pathname = usePathname();
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  return (
    <footer className="bg-[var(--blue)] p-4 2xl:px-96 h-[80px]">
      <nav>
        <MenuLink path={path}></MenuLink>
      </nav>
    </footer>
  );
}

export default Footer;
