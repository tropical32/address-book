import Search from "@/components/Search/Search";

/**
 * The top level component for the home page.
 *
 * This component renders the `Search` component which displays a search field
 * and a list of users.
 *
 * @returns The top level component for the home page.
 */
export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Search />
    </main>
  );
}
