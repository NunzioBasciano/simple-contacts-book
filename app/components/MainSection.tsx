"use client";
import React, { useEffect, useState } from "react";
import { letters } from "../data/letters";
import Link from "next/link";
import { IContact } from "../(models)/contacts";
import { getContacts } from "../actions/getContacts";
import { updateFavoriteStatus } from "../actions/updateFavoriteStatus";
import Image from "next/image";

function MainSection() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<IContact[]>([]); // Stato per i contatti filtrati
  const [searchQuery, setSearchQuery] = useState<string>(""); // Stato per la query di ricerca
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortCriterion, setSortCriterion] = useState<string>("lastName"); // Ordina di default per cognome
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await getContacts();
        setContacts(data.contacts);
        console.log(data.contacts);
        setFilteredContacts(data.contacts); // All'inizio, mostra tutti i contatti
        const sortedContacts = handleSort(data.contacts);
        setFilteredContacts(sortedContacts);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMessage("Failed to load data.");
        }
      }
    };

    loadData();
  }, []);

  // Funzione per gestire l'ordinamento
  const handleSort = (contacts: IContact[]) => {
    return contacts.sort((a, b) => {
      const aValue = a[sortCriterion as keyof IContact];
      const bValue = b[sortCriterion as keyof IContact];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });
  };

  const handleSortCriterionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortCriterion(event.target.value);
    const sortedContacts = handleSort(filteredContacts);
    setFilteredContacts([...sortedContacts]);
  };

  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortOrder(event.target.value as "asc" | "desc");
    const sortedContacts = handleSort(filteredContacts);
    setFilteredContacts([...sortedContacts]);
  };

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
      setFilteredContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact._id === contactId
            ? { ...contact, isFavorite: !currentFavoriteStatus }
            : contact
        )
      );
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
            <div className="flex gap-4">
              {/* Barra di ricerca */}
              <input
                type="text"
                placeholder="Search by name, surname, or email"
                value={searchQuery}
                onChange={handleSearch}
                className="mb-4 p-2 border border-gray-300 rounded"
              />

              {/* Selezione per criterio di ordinamento */}
              <select
                value={sortCriterion}
                onChange={handleSortCriterionChange}
                className="mb-4 p-2 border border-gray-300 rounded"
              >
                <option value="firstName">Nome</option>
                <option value="lastName">Cognome</option>
                <option value="email">Email</option>
              </select>

              {/* Selezione per ordine crescente o decrescente */}
              <select
                value={sortOrder}
                onChange={handleSortOrderChange}
                className="mb-4 p-2 border border-gray-300 rounded"
              >
                <option value="asc">Ascendente</option>
                <option value="desc">Discendente</option>
              </select>
            </div>

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

export default MainSection;
