import React from "react";
import { letters } from "../data/letters";
import Link from "next/link";

const contactList = [
  { id: 1, name: "Pippo", surName: "Paperini" },
  { id: 2, name: "Pluto", surName: "Suca" },
  { id: 3, name: "Paperino", surName: "Milla" },
  { id: 1, name: "Pippo", surName: "Paperini" },
  { id: 2, name: "Pluto", surName: "Suca" },
  { id: 3, name: "Paperino", surName: "Milla" },
  { id: 1, name: "Pippo", surName: "Paperini" },
  { id: 2, name: "Pluto", surName: "Suca" },
  { id: 3, name: "Paperino", surName: "Milla" },
  { id: 1, name: "Pippo", surName: "Paperini" },
  { id: 2, name: "Pluto", surName: "Suca" },
  { id: 3, name: "Paperino", surName: "Milla" },
  { id: 1, name: "Pippo", surName: "Paperini" },
  { id: 2, name: "Pluto", surName: "Suca" },
  { id: 3, name: "Paperino", surName: "Milla" },
  { id: 1, name: "Pippo", surName: "Paperini" },
  { id: 2, name: "Pluto", surName: "Suca" },
  { id: 3, name: "Paperino", surName: "Milla" },
  { id: 1, name: "Pippo", surName: "Paperini" },
  { id: 2, name: "Pluto", surName: "Suca" },
  { id: 3, name: "Paperino", surName: "Milla" },
  { id: 1, name: "Pippo", surName: "Paperini" },
  { id: 2, name: "Pluto", surName: "Suca" },
  { id: 3, name: "Paperino", surName: "Milla" },
];

function MainSection() {
  return (
    <main className="m-4 flex justify-between">
      <section>
        <ul className="flex flex-col gap-4">
          {contactList.map((item, index) => (
            <li className="flex items-center gap-2" key={index}>
              <div className="bg-[var(--orange)] p-2 rounded-full w-[30px] h-[30px] flex items-center justify-center">
                {item.surName[0]}
              </div>
              {item.name} {item.surName}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <ul className="flex flex-col justify-center items-center">
          {letters.map((item, index) => (
            <Link href={"/"} key={index}>
              <li>{item}</li>
            </Link>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default MainSection;
