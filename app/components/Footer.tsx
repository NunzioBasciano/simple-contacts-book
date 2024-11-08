import Image from "next/image";
import Link from "next/link";
import React from "react";
import { navLinks } from "../data/navLinks";

function Footer() {
  return (
    <footer className="bg-[var(--blue)] p-3">
      <nav>
        <ul className="flex items-center justify-around gap-3">
          {navLinks.map((item, index) => (
            <li className="flex flex-col items-center gap-1" key={index}>
              <Image src={item.image} alt={item.alt} width={25} height={25} />
              <Link className="text-[10px]" href={item.link}>
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
