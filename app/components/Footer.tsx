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
    <footer className="bg-[var(--blue)] p-3 ">
      <nav className="w-full max-w-[1200px] mx-auto">
        <MenuLink path={path}></MenuLink>
      </nav>
    </footer>
  );
}

export default Footer;
