const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getDetail = async (id: string) => {
  try {
    // Make a GET request to fetch the contact details by ID
    const res = await fetch(`${apiUrl}/contacts/${id}`, {
      cache: "no-cache", // Disable caching to get the latest data
    });

    // Check if the response is successful
    if (!res.ok) {
      throw new Error(
        `Request failed: ${res.status} ${res.statusText}`
      );
    }

    // Parse the response data as JSON
    const data = await res.json();

    // Check if the contact data is present in the response
    if (!data.contact) {
      throw new Error("Contact data not found in the response");
    }

    return data.contact; // Return the contact data
  } catch (error) {
    // Error handling based on the type of error
    if (error instanceof Error) {
      console.error("Error fetching data:", error.message);
      throw new Error(error.message || "Unknown error occurred while fetching data");
    } else {
      console.error("Unknown error occurred while fetching data");
      throw new Error("Unknown error occurred while fetching data");
    }
  }
};