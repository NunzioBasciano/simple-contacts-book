"use client";
import React, { useEffect, useState } from "react";
import { letters } from "../data/letters";
import Link from "next/link";
import { IContact } from "../(models)/contacts";

const fetchData = async (): Promise<{ contacts: IContact[] }> => {
  try {
    const res = await fetch(`/api/contacts`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching data:", error.message);
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};

function MainSection() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchData();
        console.log(data);
        setContacts(data.contacts);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMessage("Failed to load data.");
        }
      }
    };

    loadData();
  }, []);

  return (
    <main className="m-4 flex justify-between">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {loading ? (
        <p>Is loading</p>
      ) : (
        <>
          <section>
            <ul className="flex flex-col gap-4">
              {contacts.map((item, index) => (
                <li className="flex items-center gap-2" key={index}>
                  <div className="bg-[var(--orange)] p-2 rounded-full w-[30px] h-[30px] flex items-center justify-center">
                    {(item.lastName && item.lastName[0]) ||
                      (item.firstName && item.firstName[0])}
                  </div>
                  {item.firstName} {item.lastName}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <ul className="flex flex-col justify-center items-center">
              {letters.map((item, index) => (
                <Link href="/" key={index}>
                  <li>{item}</li>
                </Link>
              ))}
            </ul>
          </section>
        </>
      )}
    </main>
  );
}

export default MainSection;
