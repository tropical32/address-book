import Image from "next/image";
import { NationalityCode } from "../Nationality/Nationalities";
import { nationalityCodeToFlag } from "@/utils/utils";
import { User } from "@/types/types";

interface AddressBookEntryProps {
  user: User;
  onSelectUser: (user: User) => void;
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
export default function AddressBookEntry({
  user,
  onSelectUser,
}: AddressBookEntryProps) {
  return (
    <button
      data-testid="address-book-entry"
      key={user.email}
      popoverTarget="address_popover"
      className="p-5 rounded-xl border cursor-pointer transition-shadow duration-200 hover:shadow-lg"
      aria-label={`Contact details for ${user.name.first} ${user.name.last}`}
      onClick={() => onSelectUser(user)}
    >
      <header className="text-sm font-medium">
        <div className="flex space-x-3">
          <Image
            src={user.picture.thumbnail}
            alt={`${user.name.first} ${user.name.last}`}
            className="h-10 w-10 rounded-full"
            width={10}
            height={10}
          />
          <div className="flex flex-col flex-1">
            <h2 className="font-semibold text-left">
              {user.name.first} {user.name.last}
            </h2>
            <p className="text-gray-700 text-left">@{user.login.username}</p>
          </div>
          <span
            className="text-2xl text-left"
            aria-label={`Nationality: ${user.nat}`}
          >
            {nationalityCodeToFlag(user.nat as NationalityCode)}
          </span>
        </div>
      </header>

      <p className="text-left text-sm text-gray-500 mt-2">{user.email}</p>
    </button>
  );
}
