"use client";
import Image from "next/image";
import React, { useState } from "react";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import Link from "next/link";
import { saveContact } from "../actions/saveContact";

function AddContact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    isFavorite: false,
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const savedContact = await saveContact(formData);
      setMessage("Contatto salvato con successo!");
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        isFavorite: false,
      });
    } catch (error) {
      setMessage("Errore durante il salvataggio del contatto.");
      console.log(error);
    }
  };

  return (
    <section>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        {/* Section close image, add contact, save button */}
        <div className="my-3">
          <div className="flex p-3 justify-between">
            <div className="flex items-center gap-3">
              <Link href={"/"}>
                <Image
                  src="/close.png"
                  alt="close icon"
                  width={20}
                  height={20}
                  style={{ objectFit: "contain" }} // Use style prop instead
                />
              </Link>
              <h2 className="text-3xl">Add contact</h2>
            </div>
            <Button
              label="Save"
              style="bg-[var(--orange)] px-4 py-1 rounded-xl text-white flex item-center justify-center text-2zl"
            />
          </div>
        </div>
        <div className="flex flex-col px-9 gap-3">
          <InputBox
            inputName={"firstName"}
            placeholder="Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <InputBox
            inputName={"lastName"}
            placeholder="Surname"
            value={formData.lastName}
            onChange={handleChange}
          />
          <InputBox
            inputType="email"
            inputName={"email"}
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputBox
            inputType="tel"
            inputName={"phone"}
            placeholder="Phone Number:"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </form>
    </section>
  );
}

export default AddContact;
