import { IContact } from "../(models)/contacts";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export const saveContact = async (body: IContact) => {
    try {
        const res = await fetch(`${apiUrl}/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            throw new Error(`Errore HTTP! status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Errore durante il salvataggio del contatto:", error);
        throw error;
    }
};