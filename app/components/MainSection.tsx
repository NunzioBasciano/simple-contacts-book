"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { IContact } from "../(models)/contacts";
import { getContacts } from "../actions/getContacts";
import { updateFavoriteStatus } from "../actions/updateFavoriteStatus";
import InputBox from "./InputBox";
import SelectBox from "./SelectBox";
import { optionCriterion } from "../data/optionCriterion";
import { optionOrder } from "../data/optionOrder";
import Button from "./Button";

function MainSection() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<IContact[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortCriterion, setSortCriterion] = useState<string>("lastName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  /**
   * Sorts the contacts based on the selected criterion and order.
   * @param {IContact[]} contacts - The list of contacts to be sorted.
   * @returns {IContact[]} - The sorted list of contacts.
   */
  const handleSort = useCallback(
    (contacts: IContact[]) => {
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
    },
    [sortCriterion, sortOrder]
  );

  /**
   * Filters contacts based on the search query.
   * @param {string} query - The search query entered by the user.
   */
  const handleSearch = useCallback(
    (query: string): void => {
      setSearchQuery(query);

      const filtered = contacts.filter((contact) =>
        `${contact.firstName} ${contact.lastName} ${contact.email}`
          .toLowerCase()
          .includes(query.toLowerCase())
      );
      setFilteredContacts(filtered);
    },
    [contacts]
  );

  useEffect(() => {
    /**
     * Loads contacts data from the API, sorts it based on current criteria,
     * and updates the state with sorted contacts.
     */
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await getContacts();
        setContacts(data.contacts);
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

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, handleSearch]);

  /**
   * Updates the sorting criterion and applies the sorting to filtered contacts.
   * @param {React.ChangeEvent<HTMLSelectElement>} event - The event triggered by changing the criterion selection.
   */
  const handleSortCriterionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortCriterion(event.target.value);
    const sortedContacts = handleSort(filteredContacts);
    setFilteredContacts([...sortedContacts]);
  };

  /**
   * Updates the sorting order and applies the sorting to filtered contacts.
   * @param {React.ChangeEvent<HTMLSelectElement>} event - The event triggered by changing the sort order.
   */
  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortOrder(event.target.value as "asc" | "desc");
    const sortedContacts = handleSort(filteredContacts);
    setFilteredContacts([...sortedContacts]);
  };

  /**
   * Toggles the favorite status of a contact.
   * @param {string} contactId - The ID of the contact whose favorite status is being updated.
   * @param {boolean} currentFavoriteStatus - The current favorite status of the contact.
   */
  const handleFavoriteToggle = async (
    contactId: string,
    currentFavoriteStatus: boolean
  ) => {
    try {
      // Sends a PUT request to update the favorite status of the contact
      const updatedContact = await updateFavoriteStatus(
        contactId,
        !currentFavoriteStatus
      );
      console.log(updatedContact);

      // Updates the favorite status in both contacts and filteredContacts states
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
      ) : contacts.length === 0 && !loading ? ( // Controlla se ci sono contatti e se il caricamento è terminato
        <p className="text-center text-white">
          Add your first contacts to get started!
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
                setValue={setSearchQuery}
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

            {/* Filtered contacts */}
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

                  {/* Button for handleFavoriteToggle */}
                  <Button
                    action={() => {
                      if (item._id && item.isFavorite !== undefined) {
                        handleFavoriteToggle(item._id, item.isFavorite);
                      } else {
                        console.error("Contatto senza ID valido.");
                      }
                    }}
                    image={
                      item.isFavorite ? "/heart-full.png" : "/heart-empty.png"
                    }
                    imageAlt={item.isFavorite ? "full heart" : "empty heart"}
                    style="ml-4"
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

export default MainSection;
