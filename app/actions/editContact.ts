import { IContact } from "../(models)/contacts";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const editContact = async (body: IContact) => {
  try {
    const response = await fetch(`${apiUrl}/contacts/${body._id}`, {
      method: "PUT", // PUT method to update the contact
      headers: {
        "Content-Type": "application/json", // Sets the content type to JSON
      },
      body: JSON.stringify(body), // Directly converts `body` into JSON
    });

    // Check if the response was successful
    if (!response.ok) {
      throw new Error(`Request error: ${response.status} ${response.statusText}`);
    }

    // Return the response body as a JSON object
    return await response.json();
  } catch (error) {
    // Error handling based on error type
    if (error instanceof Error) {
      console.error("Error while updating contact:", error.message);
      throw new Error(error.message || "Unknown error during contact update");
    } else {
      console.error("Unknown error during contact update");
      throw new Error("Unknown error during contact update");
    }
  }
};