import Nationalities from "@/components/Nationality/Nationalities";
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
    <>
      <Nav />
      <main className="responsive-container">
        <Nationalities />

        <p className="text-gray-500 text-center mt-4">
          Select the nationality to be used with filtering.
        </p>
      </main>
    </>
  );
}
