"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IContact } from "../(models)/contacts";
import { getContacts } from "../actions/getContacts";
import InputBox from "../components/InputBox";
import SelectBox from "../components/SelectBox";
import { useFiltersAndSorting } from "../data/filter";
import { optionCriterion } from "../data/optionCriterion";
import { optionOrder } from "../data/optionOrder";
import { handleFavoriteToggle } from "../data/favoriteUtils";
import Button from "../components/Button";

function Favorites() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<IContact[]>([]); // Stato per i contatti filtrati
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /* Use custom hook */
  const {
    searchQuery,
    setSearchQuery,
    sortCriterion,
    sortOrder,
    handleSort,
    handleSearch,
    handleSortCriterionChange,
    handleSortOrderChange,
  } = useFiltersAndSorting();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await getContacts();
        setContacts(data.contacts); // Salva tutti i contatti
        const sortedContacts = handleSort(data.contacts);
        setFilteredContacts(sortedContacts);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMessage("Failed to load data.");
        }
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [handleSort]);

  // Filtra i contatti in base ai preferiti e alla ricerca
  useEffect(() => {
    const filtered = contacts.filter((contact) => contact.isFavorite); // Filtra solo i preferiti
    const searchFiltered = handleSearch(searchQuery, filtered); // Applica la ricerca ai preferiti
    setFilteredContacts(searchFiltered); // Imposta i contatti filtrati
  }, [contacts, searchQuery, handleSearch]);

  return (
    <main className="m-4 flex justify-between">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : filteredContacts.length === 0 && !loading ? (
        <p className="text-center text-white">
          Add your first favorite contacts to get started!
        </p>
      ) : (
        <>
          <section className="mx-auto">
            {/* Search and order section */}
            <form className="flex mb-3 gap-3">
              <InputBox
                inputType="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                inputName="search"
              />
              <SelectBox
                value={sortCriterion}
                onChange={handleSortCriterionChange}
                id="criteria"
                className="bg-[var(--darkBlue)]  px-1 w-full border border-1 rounded-md text-white"
                options={optionCriterion}
              />
              <SelectBox
                value={sortOrder}
                onChange={handleSortOrderChange}
                id="order"
                className="bg-[var(--darkBlue)] px-1 w-full border border-1 rounded-md text-white"
                options={optionOrder}
              />
            </form>

            <ul className="flex flex-col gap-4">
              {filteredContacts.map((item) => (
                <div
                  className="flex items-center justify-between"
                  key={item._id}
                >
                  <Link href={`/contacts/${item._id}`}>
                    <li className="flex items-center gap-2">
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
                  <Button
                    action={() => {
                      if (item._id && item.isFavorite !== undefined) {
                        handleFavoriteToggle(
                          item._id,
                          item.isFavorite,
                          setContacts,
                          setFilteredContacts
                        );
                      } else {
                        console.error("Contatto senza ID valido.");
                      }
                    }}
                    image={
                      item.isFavorite ? "/heart-full.png" : "/heart-empty.png"
                    }
                    imageAlt={item.isFavorite ? "full heart" : "empty heart"}
                    style="flex item-center justify-center w-[30px] h-[30px]"
                  />
                </div>
              ))}
            </ul>
          </section>
        </>
      )}
    </main>
  );
}

export default Favorites;
