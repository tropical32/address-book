"use client";

import Link from "next/link";

interface SearchProps {
  onSearchChangeAction: (value: string) => void;
}

/**
 * Renders the search component with an input field and a settings link.
 *
 * This component displays a sticky header containing a search input field
 * and a link to the settings page. The search input allows users to filter
 * the list of users by their name or email. The input field triggers the
 * `onSearchChange` callback whenever the input value changes.
 *
 * @param {SearchProps} props - The component props.
 * @param {(value: string) => void} props.onSearchChangeAction - The function to call
 * when the search input value changes.
 * @returns The rendered search component.
 */
export default function Search({ onSearchChangeAction }: SearchProps) {
  return (
    <header className="sticky top-0 z-10 bg-white drop-shadow-sm">
      <nav className="p-5">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold flex-1">Address Book</h1>
          <Link aria-label="Go to settings page" href="/settings">
            <span role="img"> ⚙️</span>
          </Link>
        </div>

        <input
          type="search"
          role="searchbox"
          aria-label="Search users by name and last name."
          className="mt-2 w-full rounded-md border border-gray-300 bg-white py-2 pl-2 placeholder-gray-500"
          placeholder="🔎 Search users..."
          onChange={(e) => onSearchChangeAction(e.target.value)}
        />
      </nav>
    </header>
  );
}
