import { IContact } from "../(models)/contacts";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getContacts = async (): Promise<{ contacts: IContact[] }> => {
    try {
      const res = await fetch(`${apiUrl}/contacts`, {
        cache: "no-cache",
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching data:", error.message);
        throw new Error(error.message);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  };
  