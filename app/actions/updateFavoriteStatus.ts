const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const updateFavoriteStatus = async (contactId: string, isFavorite: boolean) => {
    const response = await fetch(`${apiUrl}/contacts/${contactId}`, {
      method: 'PUT', // Metodo PUT per aggiornare il contatto
      headers: {
        'Content-Type': 'application/json', // Imposta il tipo di contenuto come JSON
      },
      body: JSON.stringify({ isFavorite }), // Converte l'oggetto in JSON
    });
  
    // Gestisce la risposta del server
    if (!response.ok) {
      throw new Error('Failed to update favorite status');
    }
  
    return response.json(); // Restituisce il corpo della risposta come oggetto JSON
  };