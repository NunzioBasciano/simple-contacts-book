"use client";
import { getDetail } from "@/app/actions/getDetail";
import Button from "@/app/components/Button";
import InputBox from "@/app/components/InputBox";
import { labels } from "@/app/data/label";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Toast from "@/app/components/Toast"; // Importa il Toast personalizzato
import Modal from "@/app/components/Modal";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [id, setId] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Stato per gestire la modale

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

  // Handle changes in form input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission (update contact)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/contacts/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Error updating contact");
      }
      await res.json();
      setToastMessage("Contact updated successfully!");
      setToastType("success");
    } catch (error) {
      console.error("Error:", error);
      setToastMessage("Error updating contact.");
      setToastType("error");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/contacts/${formData._id}`, {
        method: "DELETE", // DELETE request to the server
      });

      if (!res.ok) {
        throw new Error("Error deleting contact");
      }

      // Aggiorniamo il messaggio del toast a "Success Delete"
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
                  placeholder="Phone Number:"
                  value={formData.phone}
                  onChange={handleChange}
                />
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
