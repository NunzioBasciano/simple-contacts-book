"use client";
import { getDetail } from "@/app/actions/getDetail";
import Button from "@/app/components/Button";
import InputBox from "@/app/components/InputBox";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      try {
        const params = await paramsPromise;
        const contactId = params.id;

        if (id !== contactId) {
          setId(contactId);
          const fetchedContact = await getDetail(contactId);

          // Imposta direttamente formData senza usare `contact`
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
  }, [paramsPromise, id]); // Aggiungi `id` per evitare chiamate inutili

  // Handle form changes
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
      // Utilizza l'ID del contatto nella URL per la PUT request
      const res = await fetch(`/api/contacts/${formData._id}`, {
        method: "PUT", // Cambia il metodo a "PUT"
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Invia i dati aggiornati
      });

      if (!res.ok) {
        throw new Error("Error updating contact");
      }
      const result = await res.json();
      console.log("Updated contact:", result);
      // Puoi anche aggiungere una logica per aggiornare la UI o fare un redirect
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error saving contact");
    }
  };

  // Handle delete contact
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        const res = await fetch(`/api/contacts/${formData._id}`, {
          method: "DELETE", // DELETE request to the server
        });

        if (!res.ok) {
          throw new Error("Error deleting contact");
        }

        // If successful, redirect or update UI
        alert("Contact deleted successfully");
        // Redirect to home page or other appropriate page
        window.location.href = "/";
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("Error deleting contact");
      }
    }
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
                  <div className="flex items-center gap-3">
                    <Link href={"/"}>
                      <Image
                        src="/close.png"
                        alt="close icon"
                        width={20}
                        height={20}
                      />
                    </Link>
                    <h2 className="text-3xl">Edit contact</h2>
                  </div>
                  <Button
                    label="Save"
                    style="bg-[var(--orange)] px-4 py-1 rounded-xl text-white flex item-center justify-center text-2xl"
                  />
                </div>
              </div>
              <div className="flex flex-col px-9">
                <InputBox
                  inputName={"firstName"}
                  label="Name:"
                  placeholder="Name"
                  value={formData.firstName}
                  setValue={(value) =>
                    handleChange({
                      target: { name: "firstName", value },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                />
                <InputBox
                  inputName={"lastName"}
                  label="Surname:"
                  placeholder="Surname"
                  value={formData.lastName}
                  setValue={(value) =>
                    handleChange({
                      target: { name: "lastName", value },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                />
                <InputBox
                  inputType="email"
                  inputName={"email"}
                  label="Email:"
                  placeholder="Email"
                  value={formData.email}
                  setValue={(value) =>
                    handleChange({
                      target: { name: "email", value },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                />
                <InputBox
                  inputType="tel"
                  inputName={"phone"}
                  label="Phone:"
                  placeholder="Phone Number:"
                  value={formData.phone}
                  setValue={(value) =>
                    handleChange({
                      target: { name: "phone", value },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                />
              </div>
            </form>
            <div className="flex items-center justify-center">
              <Button
                action={handleDelete}
                label="Delete"
                style="bg-[var(--orange)] px-4 py-1 rounded-xl text-white flex item-center justify-center text-2xl"
              />
            </div>
          </>
        )
      )}
    </section>
  );
}

export default Contact;
