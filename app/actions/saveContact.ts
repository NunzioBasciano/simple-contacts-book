import { IContact } from "../(models)/contacts";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const saveContact = async (body: IContact) => {
  try {
    // Make a POST request to save a new contact
    const res = await fetch(`${apiUrl}/contacts`, {
      method: 'POST', // HTTP method to create a new contact
      headers: {
        'Content-Type': 'application/json', // Specify that the request body contains JSON
      },
      body: JSON.stringify(body), // Convert the contact data into JSON format
    });

<<<<<<< HEAD
        if (!res.ok) {
            throw new Error(`Errore HTTP! status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error saving contact:", error);
        throw error;
=======
    // Check if the response was successful
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
>>>>>>> main
    }

    // Parse the response data as JSON
    const data = await res.json();
    return data; // Return the saved contact data
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error while saving the contact:", error);
    throw error; // Re-throw the error for further handling
  }
};