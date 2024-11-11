export const getDetail = async (id: string) => {
  try {
    const res = await fetch(`/api/contacts/${id}`, {
      cache: "no-cache",
    });

    // Verifica se la risposta è andata a buon fine
    if (!res.ok) {
      throw new Error(
        `Errore nella richiesta: ${res.status} ${res.statusText}`
      );
    }

    // Parso i dati in JSON
    const data = await res.json();

    // Controllo se l'oggetto `contact` è presente nella risposta
    if (!data.contact) {
      throw new Error("Dati del contatto non trovati nella risposta");
    }

    return data.contact;
  } catch (error) {
    // Gestione dell'errore in base al tipo
    if (error instanceof Error) {
      console.error("Errore durante il fetch dei dati:", error.message);
      throw new Error(error.message || "Errore sconosciuto durante il fetch dei dati");
    } else {
      console.error("Errore sconosciuto durante il fetch dei dati");
      throw new Error("Errore sconosciuto durante il fetch dei dati");
    }
  }
};
