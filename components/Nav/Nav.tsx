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
    <header className="sticky top-0 z-10 bg-white drop-shadow-md">
      <nav className="responsive-container p-5">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold flex-1">Address Book</h1>
          <Link href="/" aria-label="Return to home page">
            <span role="img">📖</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
