import { Flags } from "@/components/Flag/Flags";
import Nav from "@/components/Nav/Nav";

/**
 * Renders the settings page for selecting nationalities.
 *
 * The settings page allows users to choose nationalities for filtering.
 * It displays a grid of selectable flags for Switzerland, Spain, France,
 * and Great Britain. A navigation bar is included at the top of the page.
 *
 * @returns The settings page component.
 */
export default function Settings() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Nav />
      <Flags />

      <p className="text-gray-500 text-center mt-4">
        Select the nationality to be used with filtering.
      </p>
    </main>
  );
}
