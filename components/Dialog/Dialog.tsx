import Image from "next/image";

import { User } from "@/types/types";
import { NationalityCode } from "../Nationality/Nationalities";
import { nationalityCodeToFlag } from "@/utils/utils";

interface DialogProps {
  user: User;
}

/**
 * A modal dialog component that displays a user's detailed information.
 *
 * This component takes a `User` object as a prop and displays a modal dialog
 * with the user's contact information and address. The dialog is only visible
 * when the user is selected.
 *
 * @param {DialogProps} props The component props.
 * @param {User} props.user The user object to display in the dialog.
 *
 * @returns The rendered dialog component.
 */
export default function Dialog({ user }: DialogProps) {
  return (
    <div
      role="dialog"
      popover="auto"
      id="address_popover"
      className="
        [&:popover-open]:flex
        [&:popover-open]:items-center
        [&:popover-open]:justify-center
        [&:popover-open]:drop-shadow-2xl
        [&:popover-open]:rounded-lg
      "
    >
      <div className="p-4 max-w-md w-full">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-4">
            <Image
              alt={`${user.name.first} ${user.name.last}`}
              src={user.picture.thumbnail}
              className="h-16 w-16 rounded-full"
              width={16}
              height={16}
            />
            <div>
              <h2 className="text-xl font-semibold">
                {user.name.first} {user.name.last}
              </h2>
              <p className="text-gray-500">@{user.login.username}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Contact Information
            </h3>
            <div className="space-y-2">
              <p className="text-sm">
                📧{" "}
                <a
                  href={`mailto:${user.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {user.email}
                </a>
              </p>
              <p className="text-sm">
                📱{" "}
                <a
                  href={`tel:${user.phone}`}
                  className="text-blue-600 hover:underline"
                >
                  {user.phone}
                </a>
              </p>
              <p className="text-sm">
                ☎️{" "}
                <a
                  href={`tel:${user.cell}`}
                  className="text-blue-600 hover:underline"
                >
                  {user.cell}
                </a>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Address</h3>
            <address className="text-sm not-italic space-y-1">
              <p>
                {nationalityCodeToFlag(user.nat as NationalityCode)}{" "}
                {user.location.street.name} {user.location.street.name}
              </p>
              <p>
                {user.location.city}, {user.location.state}
              </p>
              <p>{user.location.postcode}</p>
            </address>
          </div>
        </div>
      </div>
    </div>
  );
}
