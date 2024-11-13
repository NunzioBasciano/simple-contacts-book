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

function AddContact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    isFavorite: false,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  // State for validation status of phone number and name
  const [validPhone, setValidPhone] = useState(true);
  const [validName, setValidName] = useState(true);

  const isFormValid =
    formData.firstName.length > 3 && formData.phone.length > 10;

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
    if (!validPhone && !validName) {
      return; // Do not submit the form if phone or name is invalid
    }
    try {
      await saveContact(formData);
      setToastMessage("Contact saved successfully!"); // Success message
      setToastType("success");
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        isFavorite: false,
      });
    } catch (error) {
      setToastMessage("Errore durante il salvataggio del contatto.");
      setToastType("error");
      console.log(error);
    }
  };

  const closeToast = () => {
    setToastMessage(null);
  };

  return (
    <section>
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
              <h2 className="text-3xl">{labels.addContact}</h2>
            </div>
            <Button
              label="Save"
              style={`${
                isFormValid
                  ? "bg-[var(--orange)] px-4 py-1 rounded-xl text-white"
                  : "bg-[var(--blue)] px-4 py-1 rounded-xl cursor-not-allowed"
              } flex item-center justify-center text-2xl`}
              type="submit"
              validation={!isFormValid} // Disabilita il pulsante se isFormValid è false
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

      {/* Condizione per mostrare il Toast */}
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={closeToast} />
      )}
    </section>
  );
}

export default AddContact;
