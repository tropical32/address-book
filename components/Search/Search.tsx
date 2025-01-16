"use client";

import Link from "next/link";

/**
 * The top bar of the app with a search field.
 *
 * Displays a simple top bar with a search field that is sticky at the top of the
 * page. The search field is a simple text input with a placeholder and a cog
 * icon on the right side that links to the settings page.
 *
 * @returns The top bar of the app with a search field.
 */
export default function Search() {
  return (
    <header className="sticky top-0 z-10 bg-white drop-shadow-sm">
      <div className="p-5">
        <div className="flex items-center">
          <p className="text-2xl font-bold flex-1">Address Book</p>
          <Link href="/settings">⚙️</Link>
        </div>

        <input
          type="text"
          className="mt-2 w-full rounded-md border border-gray-300 bg-white py-2 pl-2 placeholder-gray-500"
          placeholder="🔎 Search users..."
        />
      </div>
    </header>
  );
}
