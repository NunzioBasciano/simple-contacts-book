import { IContact } from "../(models)/contacts";

export const saveContact = async (body: IContact) => {
    try {
        const res = await fetch('/api/contacts', {
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
        console.log("Contatto salvato:", data);
        return data;
    } catch (error) {
        console.error("Errore durante il salvataggio del contatto:", error);
        throw error;
    }
};