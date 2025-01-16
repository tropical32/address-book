import Image from "next/image";
import { NationalityCode } from "../Nationality/Nationalities";
import { nationalityCodeToFlag } from "@/utils/utils";
import { User } from "@/types/types";

interface AddressBookEntryProps {
  user: User;
}

/**
 * A single entry in the address book.
 *
 * This component displays a single user from the address book in a compact
 * format. It displays the user's name, username, email, and a small avatar.
 *
 * @param {AddressBookEntryProps} props The component props.
 * @returns The rendered component.
 */
export default function AddressBookEntry({ user }: AddressBookEntryProps) {
  return (
    <div
      key={user.email}
      className="p-5 rounded-xl border cursor-pointer transition-shadow duration-200 hover:shadow-lg"
    >
      <div className="text-sm font-medium">
        <div className="flex space-x-3">
          <Image
            src={user.picture.thumbnail}
            alt={`${user.name.first} ${user.name.last}`}
            className="h-10 w-10 rounded-full"
            width={10}
            height={10}
          />
          <div className="flex flex-col flex-1">
            <div className="font-semibold">
              {user.name.first} {user.name.last}
            </div>
            <div className="text-gray-700">@{user.login.username}</div>
          </div>
          <span className="text-2xl">
            {nationalityCodeToFlag(user.nat as NationalityCode)}
          </span>
        </div>
      </div>

      <p className="truncate text-sm text-gray-500 mt-2">{user.email}</p>
    </div>
  );
}
