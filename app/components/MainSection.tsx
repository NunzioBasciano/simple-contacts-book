"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IContact } from "../(models)/contacts";
import { getContacts } from "../actions/getContacts";
import { updateFavoriteStatus } from "../actions/updateFavoriteStatus";
import Image from "next/image";
import InputBox from "./InputBox";
import SelectBox from "./SelectBox";
import { optionCriterion } from "../data/optionCriterion";
import { optionOrder } from "../data/optionOrder";

function MainSection() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<IContact[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortCriterion, setSortCriterion] = useState<string>("lastName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await getContacts();
        setContacts(data.contacts);
        const sortedContacts = handleSort(data.contacts);
        setFilteredContacts(sortedContacts);
        /*  setLoading(false); */
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMessage("Failed to load data.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [sortCriterion, sortOrder]);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  // Funzione per gestire il cambio del campo di ricerca
  const handleSearch = (query: string): void => {
    setSearchQuery(query); // Imposta `searchQuery`

    const filtered = contacts.filter((contact) =>
      `${contact.firstName} ${contact.lastName} ${contact.email}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setFilteredContacts(filtered); // Aggiorna i contatti filtrati
  };

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
            <form className="flex ">
              <InputBox
                inputType="text"
                placeholder="Search by name, surname, or email"
                value={searchQuery}
                setValue={setSearchQuery}
                inputName="search"
              />
              <SelectBox
                value={sortCriterion}
                onChange={handleSortCriterionChange}
                id="criteria"
                className=""
                options={optionCriterion}
              />
              <SelectBox
                value={sortOrder}
                onChange={handleSortOrderChange}
                id="order"
                className=""
                options={optionOrder}
              />
            </form>

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
          {/*           <section>
            <ul className="flex flex-col justify-center items-center">
              {letters.map((item, index) => (
                <Link href="/" key={index}>
                  <li>{item}</li>
                </Link>
              ))}
            </ul>
          </section> */}
        </>
      )}
    </main>
  );
}

export default MainSection;
