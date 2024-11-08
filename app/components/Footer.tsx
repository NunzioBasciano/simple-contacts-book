import Image from "next/image";
import Link from "next/link";
import React from "react";
import { navLinks } from "../data/navLinks";

function Footer() {
  return (
    <footer className="bg-[var(--blue)] p-3 fixed bottom-0 left-0 right-0">
      <nav>
        <ul className="flex items-center justify-evenly gap-3">
          {navLinks.map((item, index) => (
            <li key={index}>
              <Link
                className="text-[10px] flex flex-col items-center gap-1"
                href={item.link}
              >
                <Image src={item.image} alt={item.alt} width={25} height={25} />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
