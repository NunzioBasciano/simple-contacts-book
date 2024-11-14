"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import Link from "next/link";
import { saveContact } from "../actions/saveContact";
import Toast from "../components/Toast";
import { labels } from "../data/label";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import the PhoneInput CSS
import { IContact } from "../(models)/contacts";
import { getContacts } from "../actions/getContacts";

// Main AddContact component
function AddContact() {
  // State to manage form input data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    isFavorite: false,
  });

  // State for managing Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  // State for validation status of phone number and name
  const [validPhone, setValidPhone] = useState(true);
  const [validName, setValidName] = useState(true);

<<<<<<< HEAD
  const [contacts, setContacts] = useState<IContact[]>([]);

=======
  // State to store the list of contacts
  const [contacts, setContacts] = useState<IContact[]>([]);

  // Check if the form is valid based on the first name and phone fields
>>>>>>> main
  const isFormValid =
    formData.firstName.length > 3 && formData.phone.length > 10;

  // Handle change for text inputs (name, email, etc.)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /**
   * Handles phone number input changes
   * @param value - The new phone number entered
   */
  const handlePhoneChange = (value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      phone: value,
    }));
    setValidPhone(validatePhoneNumber(value));
  };

  /**
   * Handles name input changes and validates the name length
   * @param e - The change event for the name input
   */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setValidName(validateName(value)); // Validate name length
  };

  /**
   * Validates phone number based on length and digits
   * @param phoneNumber - The phone number to validate
   * @returns true if valid, false otherwise
   */
  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneNumberPattern = /^\d{10,}$/; // Validates at least 10 digits
    return phoneNumberPattern.test(phoneNumber);
  };

  /**
   * Validates the name length (at least 3 characters)
   * @param name - The name to validate
   * @returns true if valid, false otherwise
   */
  const validateName = (name: string) => {
    return name.length >= 3; //  Name should have at least 3 characters
  };

  /**
   * Handles form submission
   * @param e - The submit event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

<<<<<<< HEAD
    // Controlla se il numero di telefono esiste già
=======
    // Check if the phone number already exists in the contacts
>>>>>>> main
    const phoneExists = contacts.some(
      (contact) => contact.phone === formData.phone
    );

<<<<<<< HEAD
    // Controlla se nome e cognome esistono già
=======
    // Check if the name already exists in the contacts
>>>>>>> main
    const nameExists = contacts.some(
      (contact) =>
        contact.firstName === formData.firstName &&
        contact.lastName === formData.lastName
    );

<<<<<<< HEAD
    if (phoneExists) {
      setToastMessage("Numero esistente!"); // Mostra toast per numero duplicato
=======
    // Show toast if phone number or name already exist
    if (phoneExists) {
      setToastMessage("Number already exists!"); // Show toast for duplicate phone number
>>>>>>> main
      setToastType("error");
      return;
    }

    if (nameExists) {
<<<<<<< HEAD
      setToastMessage("Il contatto esiste già!"); // Mostra toast per contatto duplicato
=======
      setToastMessage("Contact already exists!"); // Show toast for duplicate name
>>>>>>> main
      setToastType("error");
      return;
    }

<<<<<<< HEAD
    if (!validPhone || !validName) {
      return; // Non inviare il form se i dati non sono validi
=======
    // Don't submit if phone or name is not valid
    if (!validPhone || !validName) {
      return;
>>>>>>> main
    }

    try {
      // Save the contact to the database
      await saveContact(formData);
<<<<<<< HEAD
      setToastMessage("Contatto salvato con successo!");
=======
      setToastMessage("Contact saved successfully!");
>>>>>>> main
      setToastType("success");
      // Reset form data
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        isFavorite: false,
      });
    } catch (error) {
      // Handle errors during saving contact
      setToastMessage("Error saving contact.");
      setToastType("error");
      console.log(error);
    }
  };

  // Close the Toast notification
  const closeToast = () => {
    setToastMessage(null);
  };

<<<<<<< HEAD
  useEffect(() => {
    // Function to load data (contacts)
=======
  // Fetch contacts data on component mount
  useEffect(() => {
>>>>>>> main
    const loadData = async () => {
      try {
        const data = await getContacts(); // Fetch the contacts data
        setContacts(data.contacts); // Set the fetched contacts in state
      } catch (error: unknown) {
        if (error instanceof Error) {
<<<<<<< HEAD
=======
          // Handle error (if necessary)
>>>>>>> main
        }
      }
    };
    loadData();
<<<<<<< HEAD
  }, []);

  return (
    <main>
=======
  }, []); // Dependency array is empty, so this runs only on mount

  return (
    <main>
      {/* Form for adding a new contact */}
>>>>>>> main
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <div className="flex p-3 justify-between">
            <div className="flex items-center gap-6">
              {/* Close button */}
              <Link href={"/"}>
                <Image
                  src="/close.png"
                  alt="close icon"
                  width={20}
                  height={20}
                  style={{ objectFit: "contain" }}
                />
              </Link>
              {/* Heading */}
              <h2 className="text-3xl">{labels.addContact}</h2>
            </div>
            {/* Save button */}
            <Button
              label="Save"
              style={`${
                isFormValid
                  ? "bg-[var(--orange)] px-4 py-1 rounded-xl text-white"
                  : "bg-[var(--blue)] px-4 py-1 rounded-xl cursor-not-allowed"
              } flex item-center justify-center text-2xl`}
              type="submit"
              validation={!isFormValid} // Disable button if form is invalid
            />
          </div>
        </div>

        {/* Input fields */}
        <div className="flex flex-col px-9 py-3 gap-6">
          <InputBox
            inputName={"firstName"}
            placeholder="Name"
            value={formData.firstName}
            onChange={handleNameChange}
          />
          {!validName && (
            <p className="text-red-500">
              The name field should be contain more than 3 characters
            </p>
          )}
          <InputBox
            inputName={"lastName"}
            placeholder="Surname"
            value={formData.lastName}
            onChange={handleChange}
          />
          {/* ex */}
          <InputBox
            inputType="email"
            inputName={"email"}
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {/* Phone input field */}
          <PhoneInput
            country={"it"}
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handlePhoneChange}
            containerStyle={{
              width: "100%",
            }}
            inputStyle={{
              backgroundColor: "var(--darkBlue)",
              padding: "4px 48px",
              width: "100%",
              border: "1px solid",
              borderRadius: "0.375rem",
              color: "white",
            }}
            buttonStyle={{
              backgroundColor: "var(--darkBlue)",
              borderTopLeftRadius: "0.375rem",
              borderBottomLeftRadius: "0.375rem",
              borderRight: "1px solid white",
            }}
            dropdownStyle={{
              backgroundColor: "var(--darkBlue)",
              color: "white",
            }}
          />
          {/* Show validation error for invalid phone number */}
          {!validPhone && (
            <p className="text-red-500">
              The phone number must contain at least 10 digits
            </p>
          )}
        </div>
      </form>

      {/* Show toast notification */}
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={closeToast} />
      )}
    </main>
  );
}

export default AddContact;
