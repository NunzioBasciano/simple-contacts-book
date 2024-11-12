"use client";
import Image from "next/image";
import React, { useState } from "react";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import Link from "next/link";
import { saveContact } from "../actions/saveContact";
import Toast from "../components/Toast"; // Importa il Toast personalizzato
import { labels } from "../data/label";

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
      await saveContact(formData);
      setToastMessage("Contatto salvato con successo!");
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
      {/* Mostra il form per aggiungere un contatto */}
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
              style="bg-[var(--orange)] px-4 py-1 rounded-xl text-white flex item-center justify-center text-2xl"
            />
          </div>
        </div>
        <div className="flex flex-col px-9 py-3 gap-6">
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
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputBox
            inputType="tel"
            inputName={"phone"}
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
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
