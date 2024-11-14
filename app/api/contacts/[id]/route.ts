import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Contact from '@/app/(models)/contacts';

// Async function to handle the GET request
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // Use Promise for async params
) {
  try {
    // Await the resolution of the async parameter
    const { id } = await params;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("Invalid ID:", id);
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // Find the contact in the database
    const contact = await Contact.findById(id);

    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    // Return the contact data if found
    return NextResponse.json({ contact }, { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Async function to update a contact
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Await the resolution of the async parameter
    const { id } = await params;

    // Parse the request body
    const body = await req.json();

    // Update the contact in the database
    const updatedContact = await Contact.findByIdAndUpdate(id, body, {
      new: true, // Returns the updated contact
      runValidators: true, // Run model validation
    });

    if (!updatedContact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    // Return the updated contact
    return NextResponse.json(updatedContact, { status: 200 });
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json({ error: "Error updating contact" }, { status: 500 });
  }
}

// Async function to delete a contact
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Await the resolution of the async parameter
    const { id } = await params;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("Invalid ID:", id);
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // Find and delete the contact from the database
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    // Return a success response
    return NextResponse.json({ message: "Contact successfully deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error in DELETE request:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}