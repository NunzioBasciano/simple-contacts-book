import { IContact } from "../(models)/contacts";

export const isDuplicate = (arr: IContact[], form: { _id?: string, firstName: string, lastName: string, phone: string, email: string }) => {
    // Check for duplicate phone
    const phoneExists = arr.some(contact => contact.phone === form.phone);
  
    // Check for duplicate name
    const nameExists = arr.some(contact => contact.firstName === form.firstName && contact.lastName === form.lastName);
  
    if (phoneExists) {
      return "Numero esistente!"; // Return error message for duplicate phone number
    }
  
    if (nameExists) {
      return "Il contatto esiste già!"; // Return error message for duplicate contact
    }
  
    if (!form.phone || !form.firstName || !form.lastName) {
      return "Dati non validi!"; // Return error if fields are not valid
    }
  
    return null; // Return null if no issues
  };
  