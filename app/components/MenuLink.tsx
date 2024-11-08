import Link from "next/link";
import { navLinks } from "../data/navLinks";
import Image from "next/image";

interface IMenuLink {
  path?: string;
}

function MenuLink(props: IMenuLink) {
  const { path } = props;

  return (
    <ul className="flex items-center justify-evenly gap-3">
      {navLinks.map((item, index) => (
        <li key={index}>
          <Link href={item.link} className="text-[10px]">
            <div
              className={`flex flex-col items-center gap-1 font-['Montserrat'] transform transition-transform duration-300 ease-in-out hover:scale-110
             ${path === item.link ? "text-[var(--orange)] font-semibold" : ""}`}
            >
              <Image src={item.image} alt={item.alt} width={25} height={25} />
              {item.label}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MenuLink;
