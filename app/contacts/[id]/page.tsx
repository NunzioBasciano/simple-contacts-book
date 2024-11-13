"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "@/app/components/Button";
import InputBox from "@/app/components/InputBox";
import Link from "next/link";
import Toast from "@/app/components/Toast"; // Importa il Toast personalizzato
import { labels } from "@/app/data/label";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import the PhoneInput CSS
import { getDetail } from "@/app/actions/getDetail";
import Modal from "@/app/components/Modal";
import { editContact } from "@/app/actions/editContact";
import { deleteContact } from "@/app/actions/deleteContact";
import { IContact } from "@/app/(models)/contacts";
import { getContacts } from "@/app/actions/getContacts";

function Contact({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const [formData, setFormData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [id, setId] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Stato per gestire la modale

  // State for validation status of phone number and name
  const [validPhone, setValidPhone] = useState(true);
  const [validName, setValidName] = useState(true);
  const [contacts, setContacts] = useState<IContact[]>([]);

  const isFormValid =
    formData.firstName.length > 3 && formData.phone.length > 10;

  // Handle changes in form input fields
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

  // Handle form submission (update contact)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for duplicate phone
    const phoneExists = contacts.some(
      (contact) => contact.phone === formData.phone
    );

    // Check for duplicate name
    const nameExists = contacts.some(
      (contact) =>
        contact.firstName === formData.firstName &&
        contact.lastName === formData.lastName
    );

    if (phoneExists) {
      setToastMessage("Numero esistente!"); // Show toast for duplicate phone number
      setToastType("error");
      return;
    }

    if (nameExists) {
      setToastMessage("Il contatto esiste già!"); // Show toast for duplicate contact
      setToastType("error");
      return;
    }

    if (phoneExists && nameExists) {
      setToastMessage("Il contatto esiste già!"); // Show toast for duplicate contact
      setToastType("error");
      return;
    }

    if (!validPhone || !validName) {
      return; // Non inviare il form se i dati non sono validi
    }
    try {
      await editContact(formData);
      setToastMessage("Contact updated successfully!");
      setToastType("success");
    } catch (error) {
      console.error("Error:", error);
      setToastMessage("Error updating contact.");
      setToastType("error");
    }
  };

  // useEffect to fetch contact details and populate the form fields when the component mounts or `id` changes
  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      try {
        const params = await paramsPromise; // Resolve paramsPromise to get the `id`
        const contactId = params.id;

        if (id !== contactId) {
          // Avoid refetching if `id` hasn't changed
          setId(contactId);
          const fetchedContact = await getDetail(contactId); // Fetch contact details based on `id`

          // Directly set form data without using a temporary `contact` variable
          setFormData({
            _id: fetchedContact._id,
            firstName: fetchedContact.firstName,
            lastName: fetchedContact.lastName,
            phone: fetchedContact.phone,
            email: fetchedContact.email,
          });
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [paramsPromise, id]);

  // Fetch contacts data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getContacts(); // Fetch the contacts data
        setContacts(data.contacts); // Set the fetched contacts in state
      } catch (error: unknown) {
        if (error instanceof Error) {
          // Handle error (if necessary)
        }
      }
    };
    loadData();
  }, []); // Dependency array is empty, so this runs only on mount

  const handleDelete = async () => {
    try {
      await deleteContact(formData._id);
      setToastMessage("Contact deleted successfully!");
      setToastType("success");

      // Dopo un breve delay, reindirizziamo alla Home
      setTimeout(() => {
        window.location.href = "/";
      }, 2000); // Ritardo di 2 secondi per mostrare il messaggio del toast
    } catch (error) {
      console.error("Error:", error);
      setToastMessage("Error deleting contact.");
      setToastType("error");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section>
      {errorMessage && <p>{errorMessage}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        id && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <div className="flex p-3 justify-between">
                  <div className="flex items-center gap-6">
                    <Link href={"/"}>
                      <Image
                        src="/close.png"
                        alt="close icon"
                        width={20}
                        height={20}
                        style={{ objectFit: "contain" }}
                      />
                    </Link>
                    <h2 className="text-3xl">{labels.editContact}</h2>
                  </div>
                  <Button
                    label="Save"
                    style="bg-[var(--orange)] px-4 py-1 rounded-xl text-white flex item-center justify-center text-2xl"
                    type="submit"
                    validation={!isFormValid}
                  />
                </div>
              </div>
              <div className="flex flex-col px-9 py-3 gap-6">
                <InputBox
                  inputName={"firstName"}
                  placeholder="Name"
                  value={formData.firstName}
                  onChange={handleNameChange}
                />
                {!validName && (
                  <p className="text-red-500">
                    The name field should be contain more than 3 caracters
                  </p>
                )}
                <InputBox
                  inputName={"lastName"}
                  placeholder="Surname"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <InputBox
                  inputType="email"
                  inputName={"email"}
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
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
                {!validPhone && (
                  <p className="text-red-500">
                    The phone number must contain at least 10 digits
                  </p>
                )}
              </div>
            </form>
            <div className="flex items-center justify-center">
              <Button
                action={openModal}
                label="Delete"
                style="bg-[var(--orange)] px-4 py-1 rounded-xl text-white flex item-center justify-center text-2xl"
              />
            </div>
          </>
        )
      )}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage(null)}
        />
      )}

      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleDelete={handleDelete}
      />
    </section>
  );
}

export default Contact;
