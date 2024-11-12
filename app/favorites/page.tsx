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
import { labels } from "../data/label";

function Favorites() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<IContact[]>([]); // Stato per i contatti filtrati
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /* Use custom hook for managing search and sorting */
  const {
    searchQuery,
    setSearchQuery,
    sortCriterion,
    sortOrder,
    handleSort,
    handleSearch,
    handleSortCriterionChange,
    handleSortOrderChange,
  } = useFiltersAndSorting(); // Destructure custom hook functions

  useEffect(() => {
    // Function to load data (contacts)
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await getContacts(); // Fetch the contacts data
        setContacts(data.contacts); // Set the fetched contacts in state
        const sortedContacts = handleSort(data.contacts); // Sort the contacts
        setFilteredContacts(sortedContacts); // Set the sorted contacts in state
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMessage("Failed to load data.");
        }
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [handleSort]); // Dependency array to re-run when handleSort changes

  useEffect(() => {
    // Filter the contacts to include only those that are marked as favorites
    const filtered = contacts.filter((contact) => contact.isFavorite);
    // Apply the search filter to the favorite contacts
    const searchFiltered = handleSearch(searchQuery, filtered);
    // Set the filtered contacts to the state, so they can be displayed
    setFilteredContacts(searchFiltered);
  }, [contacts, searchQuery, handleSearch]); // The effect runs whenever contacts, searchQuery, or handleSearch change

  return (
    <main className="m-4 flex justify-between">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mx-auto">
          <section className="mx-auto">
            {/* Search and sorting form */}
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
          </section>
          <div className="">
            {/* if there aren't favorite contact show the message */}
            {contacts.filter((contact) => contact.isFavorite).length === 0 &&
              filteredContacts.length === 0 && (
                <p className="text-center text-white">
                  {labels.addFirstFavoriteContact}
                </p>
              )}
            {/* List of filtered contacts */}
            {filteredContacts.length > 0 ? (
              <section className="mx-auto">
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
                      {/* Button to toggle favorite status */}
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
                          item.isFavorite
                            ? "/heart-full.png"
                            : "/heart-empty.png"
                        }
                        imageAlt={
                          item.isFavorite ? "full heart" : "empty heart"
                        }
                        style="flex item-center justify-center w-[30px] h-[30px]"
                      />
                    </div>
                  ))}
                </ul>
              </section>
            ) : null}{" "}
          </div>
        </div>
      )}
    </main>
  );
}

export default Favorites;
