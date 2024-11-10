import { NextResponse } from "next/server";
import Contact, { IContact } from "@/app/(models)/contacts";


export async function GET() {
    try {
        const contacts: IContact[] = await Contact.find();
        console.log('array vuoto',contacts)
        return NextResponse.json({ contacts }, { status: 200 }); 

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        
        const data = await request.json(); 
        const newContact = await Contact.create(data); 
        
        return NextResponse.json(newContact, { status: 201 }); 
    } catch (error) {
        console.error("Errore durante il salvataggio del contatto:", error);
        return NextResponse.json({ error: "Errore durante il salvataggio del contatto" }, { status: 500 });
    }
}