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
      console.log(savedContact);
      setMessage("Contatto salvato con successo!");
      setFormData({ firstName: "", lastName: "", phone: "", email: "" });
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
                  alt="close icon "
                  width={20}
                  height={20}
                  objectFit="cover"
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
        <div className="flex flex-col px-9">
          {/*           <InputBox
            inputType="file"
            inputName={"image"}
            label="Add image"
            placeholder="Add image"
            value={formData.image}
            setValue={(value) =>
              handleChange({
                target: { name: "image", value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          /> */}
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
            label="email:"
            placeholder="email"
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
            label="phone"
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
    </section>
  );
}

export default AddContact;
