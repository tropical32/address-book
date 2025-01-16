import Link from "next/link";

/**
 * The top bar of the app with a link to the home page.
 *
 * Displays a simple top bar with a link to the home page. The link is a book
 * icon (📖) and is sticky at the top of the page.
 *
 * @returns The top bar of the app with a link to the home page.
 */
export default function Nav() {
  return (
    <header className="sticky top-0 z-10 bg-white drop-shadow-sm">
      <div className="p-5">
        <div className="flex items-center">
          <p className="text-2xl font-bold flex-1">Address Book</p>
          <Link href="/">📖</Link>
        </div>
      </div>
    </header>
  );
}
