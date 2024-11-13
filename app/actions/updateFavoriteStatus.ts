const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const updateFavoriteStatus = async (contactId: string, isFavorite: boolean) => {
  try {
    // Make a PUT request to update the favorite status of a contact
    const response = await fetch(`${apiUrl}/contacts/${contactId}`, {
      method: 'PUT', // HTTP method to update the contact
      headers: {
        'Content-Type': 'application/json', // Specify that the request body contains JSON
      },
      body: JSON.stringify({ isFavorite }), // Convert the `isFavorite` flag into JSON format
    });

    // Check if the response was successful
    if (!response.ok) {
      throw new Error('Failed to update favorite status');
    }

    // Parse the response data as JSON
    return await response.json(); // Return the updated contact data
  } catch (error) {
    // Handle errors that occur during the request
    if (error instanceof Error) {
      console.error("Error while updating the favorite status:", error.message);
      throw new Error(error.message || "Unknown error while updating favorite status");
    } else {
      console.error("Unknown error while updating the favorite status");
      throw new Error("Unknown error while updating favorite status");
    }
  }
};
