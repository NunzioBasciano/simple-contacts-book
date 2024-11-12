import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Contact from '@/app/(models)/contacts';

// Funzione asincrona per gestire la richiesta GET
export async function GET(
  req: Request, 
  { params }: { params: Promise<{ id: string }> } // Usa Promise per il parametro
) {
  try {
    // Attendi la risoluzione del parametro asincrono
    const { id } = await params;

    // Verifica che l'ID sia valido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("ID non valido:", id);
      return NextResponse.json({ error: "ID non valido" }, { status: 400 });
    }

    // Trova il contatto nel database
    const contact = await Contact.findById(id);

    if (!contact) {
      return NextResponse.json({ error: "Contatto non trovato" }, { status: 404 });
    }

    return NextResponse.json({ contact }, { status: 200 });
  } catch (error) {
    console.error("Errore nella richiesta:", error);
    return NextResponse.json({ error: "Errore del server" }, { status: 500 });
  }
}

// Funzione per aggiornare un contatto
export async function PUT(req: Request, { params }: {params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    try {
      const body = await req.json();
      const updatedContact = await Contact.findByIdAndUpdate(id, body, {
        new: true, // Restituisce il contatto aggiornato
        runValidators: true, // Esegui la validazione del modello
      });
  
      if (!updatedContact) {
        return NextResponse.json({ error: "Contact not found" }, { status: 404 });
      }
  
      return NextResponse.json(updatedContact, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Error updating contact" }, { status: 500 });
    }
  }

  // Funzione per eliminare un contatto
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Risolviamo il parametro 'id' dalla promessa
    const { id } = await params;

    // Verifica che l'ID sia valido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("ID non valido:", id);
      return NextResponse.json({ error: "ID non valido" }, { status: 400 });
    }

    // Trova e elimina il contatto dal database
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return NextResponse.json({ error: "Contatto non trovato" }, { status: 404 });
    }

    // Restituisci una risposta di successo
    return NextResponse.json({ message: "Contatto eliminato con successo" }, { status: 200 });
  } catch (error) {
    console.error("Errore nella richiesta di eliminazione:", error);
    return NextResponse.json({ error: "Errore del server" }, { status: 500 });
  }
}

