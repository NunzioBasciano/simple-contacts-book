const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const deleteContact = async (id: string) => {
  try {
    const response = await fetch(`${apiUrl}/contacts/${id}`, {
      method: "DELETE", // DELETE method to remove the contact
      headers: {
        "Content-Type": "application/json", // Sets the content type to JSON
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Request error: ${response.status} ${response.statusText}`);
    }

    // Return the response body as a JSON object
    return await response.json();
  } catch (error) {
    // Error handling based on error type
    if (error instanceof Error) {
      console.error("Error while deleting contact:", error.message);
      throw new Error(error.message || "Unknown error during contact deletion");
    } else {
      console.error("Unknown error during contact deletion");
      throw new Error("Unknown error during contact deletion");
    }
  }
};