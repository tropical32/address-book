"use client";

import { User } from "@/types/types";
import AddressBookEntry from "./AddressBookEntry";
import Dialog from "../Dialog/Dialog";
import { useCallback, useState } from "react";

interface AddressBookProps {
  users: User[];
}

/**
 * Renders a grid of user entries in an address book.
 *
 * This component receives a list of users as a prop and displays each user
 * using the `AddressBookEntry` component in a responsive grid layout.
 *
 * @param props - The properties for the component.
 * @param props.users - An array of user objects to be displayed.
 *
 * @returns A section element containing the grid of user entries.
 */

export default function AddressBook(props: AddressBookProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const onSelectUser = useCallback((user: User) => {
    setSelectedUser(user);
  }, []);

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {props.users.map((user) => (
          <AddressBookEntry
            key={user.email}
            user={user}
            onSelectUser={onSelectUser}
          />
        ))}
      </section>
      {selectedUser && <Dialog user={selectedUser} />}
    </>
  );
}
