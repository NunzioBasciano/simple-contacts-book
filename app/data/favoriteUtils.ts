import { IContact } from "../(models)/contacts";
import { updateFavoriteStatus } from "../actions/updateFavoriteStatus";

/**
 * Toggles the favorite status of a contact.
 * @param {string} contactId - The ID of the contact whose favorite status is being updated.
 * @param {boolean} currentFavoriteStatus - The current favorite status of the contact.
 * @param {Function} setContacts - Function to update the contacts state.
 * @param {Function} setFilteredContacts - Function to update the filteredContacts state.
 */
export const handleFavoriteToggle = async (
  contactId: string,
  currentFavoriteStatus: boolean,
  setContacts: React.Dispatch<React.SetStateAction<IContact[]>>,
  setFilteredContacts: React.Dispatch<React.SetStateAction<IContact[]>>
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
