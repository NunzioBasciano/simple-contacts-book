import Link from "next/link";
import React from "react";
import Button from "./Button";
import { IContact } from "../(models)/contacts";
import { handleFavoriteToggle } from "../data/favoriteUtils";

interface ICard {
  item: IContact;
  setState: React.Dispatch<React.SetStateAction<IContact[]>>; // Funzione per aggiornare lo stato dei contatti
  setFilteredContacts: React.Dispatch<React.SetStateAction<IContact[]>>; // Funzione per aggiornare lo stato dei contatti filtrati
}

function Card(props: ICard) {
  const { item, setState, setFilteredContacts } = props;

  return (
    <div
      className="flex items-center justify-between px-3 py-2 shadow-custom"
      key={item._id}
    >
      <Link href={`/contacts/${item._id}`}>
        <li className="flex items-center gap-2 flex-grow">
          <div className="bg-[var(--orange)] p-2 rounded-full w-[30px] h-[30px] flex items-center justify-center">
            {(item.lastName && item.lastName[0]) ||
              (item.firstName && item.firstName[0])}
          </div>
          <div>
            <div>
              {item.firstName} {item.lastName}
            </div>
            <div>{item.email}</div>
          </div>
        </li>
      </Link>

      {/* Button to toggle favorite status */}
      <div className="flex items-center justify-center ml-3">
        <Button
          action={() => {
            if (item._id && item.isFavorite !== undefined) {
              handleFavoriteToggle(
                item._id,
                item.isFavorite,
                setState,
                setFilteredContacts
              );
            } else {
              console.error("Contatto senza ID valido.");
            }
          }}
          image={item.isFavorite ? "/heart-full.png" : "/heart-empty.png"}
          imageAlt={item.isFavorite ? "full heart" : "empty heart"}
          style="w-[30px] h-[30px]"
        />
      </div>
    </div>
  );
}

export default Card;
