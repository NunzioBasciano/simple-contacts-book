import { IContact } from "../(models)/contacts";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getContacts = async (): Promise<{ contacts: IContact[] }> => {
  try {
    // Make a GET request to fetch contacts
    const res = await fetch(`${apiUrl}/contacts`, {
      cache: "no-cache", // Disable caching to always get the latest data
    });

    // Check if the response was successful
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    // Parse the response data as JSON
    const data = await res.json();
    return data; // Return the data containing contacts
  } catch (error: unknown) {
    // Error handling based on error type
    if (error instanceof Error) {
      console.error("Error fetching data:", error.message);
      throw new Error(error.message); // Re-throw the error with the message
    } else {
      throw new Error("Unknown error occurred"); // Handle unknown errors
    }
  }
};
