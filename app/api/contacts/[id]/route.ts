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
