"use client";
import { IContact } from "@/app/(models)/contacts";
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
  const [contact, setContact] = useState<IContact | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [id, setId] = useState<string>("");

  // Function to fetch contact details once params are resolved
  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      try {
        // Sblocca params dalla Promise
        const params = await paramsPromise;
        const contactId = params.id;

        if (id !== contactId) {
          setId(contactId); // Aggiorna l'id solo se è cambiato
        }

        const fetchedContact = await getDetail(contactId);
        setContact(fetchedContact);
        setFormData({
          _id: fetchedContact._id,
          firstName: fetchedContact.firstName,
          lastName: fetchedContact.lastName,
          phone: fetchedContact.phone,
          email: fetchedContact.email,
        });
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
  }, [paramsPromise, id]); // Dipende anche da id per evitare fetch inutili

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

  return (
    <section>
      {errorMessage && <p>{errorMessage}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        id && (
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
                  <h2 className="text-3xl">Add contact</h2>
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
        )
      )}
    </section>
  );
}

export default Contact;
