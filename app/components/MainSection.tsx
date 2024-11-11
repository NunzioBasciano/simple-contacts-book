"use client";
import React, { useEffect, useState } from "react";
import { letters } from "../data/letters";
import Link from "next/link";
import { IContact } from "../(models)/contacts";
import { getContacts } from "../actions/getContacts";

function MainSection() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await getContacts();
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
              {contacts.map((item) => (
                <Link key={item._id} href={`/contacts/${item._id}`}>
                  <li className="flex items-center gap-2">
                    <div className="bg-[var(--orange)] p-2 rounded-full w-[30px] h-[30px] flex items-center justify-center">
                      {(item.lastName && item.lastName[0]) ||
                        (item.firstName && item.firstName[0])}
                    </div>
                    {item.firstName} {item.lastName}
                  </li>
                </Link>
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
