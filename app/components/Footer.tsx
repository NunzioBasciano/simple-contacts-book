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
    <footer className="bg-[var(--blue)] p-3 fixed bottom-0 left-0 right-0">
      <nav>
        <MenuLink path={path}></MenuLink>
      </nav>
    </footer>
  );
}

export default Footer;
