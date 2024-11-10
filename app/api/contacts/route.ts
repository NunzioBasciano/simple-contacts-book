import { NextResponse } from "next/server";
import Contact, { IContact } from "@/app/(models)/contacts";


export async function GET() {
    try {
        const contacts: IContact[] = await Contact.find();
        return NextResponse.json({ contacts }, { status: 200 }); 

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
