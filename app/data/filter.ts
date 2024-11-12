// src/hooks/useFiltersAndSorting.ts
import { useCallback, useState } from "react";
import { IContact } from "../(models)/contacts";

/**
 * Custom hook for handling filtering and sorting of contacts.
 */
export const useFiltersAndSorting = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
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
   * @param {IContact[]} contacts - The list of contacts to filter.
   * @returns {IContact[]} - The filtered list of contacts.
   */
  const handleSearch = useCallback(
    (query: string, contacts: IContact[]): IContact[] => {
      return contacts.filter((contact) =>
        `${contact.firstName} ${contact.lastName} ${contact.email}`
          .toLowerCase()
          .includes(query.toLowerCase())
      );
    },
    []
  );

  const handleSortCriterionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriterion(event.target.value);
  };

  const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as "asc" | "desc");
  };

  return {
    searchQuery,
    setSearchQuery,
    sortCriterion,
    sortOrder,
    handleSort,
    handleSearch,
    handleSortCriterionChange,
    handleSortOrderChange,
  };
};
