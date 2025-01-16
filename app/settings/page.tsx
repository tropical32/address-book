import Flag from "@/components/Flag/Flag";
import Nav from "@/components/Nav/Nav";

const FR = "🇫🇷";
const ES = "🇪🇸";
const CH = "🇨🇭";
const GB = "🇬🇧";

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
      <section className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <Flag description="Swiss" code="CH" flag={CH} />
        <Flag description="Spanish" code="ES" flag={ES} />
        <Flag description="French" code="FR" flag={FR} />
        <Flag description="English" code="GB" flag={GB} />
      </section>

      <p className="text-gray-500 text-center mt-4">
        Select the nationality to be used with filtering.
      </p>
    </main>
  );
}
