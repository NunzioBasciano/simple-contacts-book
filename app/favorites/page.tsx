"use client";
import React, { useEffect, useState } from "react";
import { letters } from "../data/letters";
import Link from "next/link";
import { IContact } from "../(models)/contacts";
import { getContacts } from "../actions/getContacts";
import { updateFavoriteStatus } from "../actions/updateFavoriteStatus";
import Image from "next/image";

function Favorites() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<IContact[]>([]); // Stato per i contatti filtrati
  const [searchQuery, setSearchQuery] = useState<string>(""); // Stato per la query di ricerca
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Funzione per ricaricare i contatti
  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getContacts();
      const favoriteContacts = data.contacts.filter(
        (contact) => contact.isFavorite
      ); // Filtra solo i preferiti
      setContacts(data.contacts);
      setFilteredContacts(favoriteContacts); // Mostra solo i contatti preferiti
      setLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage("Failed to load data.");
      }
    }
  };

  useEffect(() => {
    loadData(); // Carica i contatti quando il componente è montato
  }, []);

  // Funzione per gestire il cambio del campo di ricerca
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filtra i contatti in base alla query di ricerca
    const filtered = contacts.filter((contact) =>
      `${contact.firstName} ${contact.lastName} ${contact.email}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setFilteredContacts(filtered); // Aggiorna i contatti filtrati
  };

  // Funzione per gestire il click sul cuoricino
  const handleFavoriteToggle = async (
    contactId: string,
    currentFavoriteStatus: boolean
  ) => {
    try {
      // Invia una richiesta PUT per aggiornare il valore di isFavorite
      const updatedContact = await updateFavoriteStatus(
        contactId,
        !currentFavoriteStatus
      );
      console.log(updatedContact);

      // Aggiorna il contatto nella lista dei contatti
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact._id === contactId
            ? { ...contact, isFavorite: !currentFavoriteStatus } // Cambia lo stato di isFavorite
            : contact
        )
      );

      // Dopo aver aggiornato lo stato, ricarica i dati
      loadData(); // Ricarica i contatti preferiti
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    }
  };

  return (
    <main className="m-4 flex justify-between">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <section>
            {/* Elenco dei contatti filtrati */}
            <ul className="flex flex-col gap-4">
              {filteredContacts.map((item) => (
                <div className="flex justify-between" key={item._id}>
                  <Link href={`/contacts/${item._id}`}>
                    <li className="flex items-center gap-2">
                      <div className="bg-[var(--orange)] p-2 rounded-full w-[30px] h-[30px] flex items-center justify-center">
                        {(item.lastName && item.lastName[0]) ||
                          (item.firstName && item.firstName[0])}
                      </div>
                      {item.firstName} {item.lastName} {item.email}
                    </li>
                  </Link>
                  <button
                    onClick={() => {
                      if (item._id && item.isFavorite !== undefined) {
                        handleFavoriteToggle(item._id, item.isFavorite);
                      } else {
                        console.error("Contatto senza ID valido.");
                      }
                    }}
                    className="ml-4"
                  >
                    {item.isFavorite ? (
                      <Image
                        src="/heart-full.png"
                        alt="full heart"
                        width={20}
                        height={20}
                      />
                    ) : (
                      <Image
                        src="/heart-empty.png"
                        alt="empty heart"
                        width={20}
                        height={20}
                      />
                    )}
                  </button>
                </div>
              ))}
            </ul>
          </section>
          <section>
            <ul className="flex flex-col justify-center items-center">
              {letters.map((item, index) => (
                <Link href="/" key={index}>
                  <li>{item}</li>
                </Link>
              ))}
            </ul>
          </section>
        </>
      )}
    </main>
  );
}

export default Favorites;
