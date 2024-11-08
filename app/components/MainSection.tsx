import React from "react";

const contactList = [
  { id: 1, name: "Pippo", surName: "Paperini" },
  { id: 2, name: "Pluto", surName: "Suca" },
  { id: 3, name: "Paperino", surName: "Milla" },
];

function MainSection() {
  return (
    <main className="m-2">
      <section>
        <ul className="flex flex-col gap-2">
          {contactList.map((item) => (
            <li className="flex items-center gap-1" key={item.id}>
              <div className="bg-[var(--orange)] p-2 rounded-full w-[30px] h-[30px] flex items-center justify-center">
                {item.surName[0]}
              </div>
              {item.name} {item.surName}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default MainSection;
