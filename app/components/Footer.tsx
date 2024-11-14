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
<<<<<<< HEAD
    <footer className="bg-[var(--blue)] p-3 ">
      <nav className="w-full max-w-[1200px] mx-auto">
=======
    <footer className="bg-[var(--blue)] p-3 2xl:px-96">
      <nav>
>>>>>>> main
        <MenuLink path={path}></MenuLink>
      </nav>
    </footer>
  );
}

export default Footer;
