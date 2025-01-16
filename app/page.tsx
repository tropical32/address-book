import AddressBook from "@/components/AddressBook/AddressBook";
import Search from "@/components/Search/Search";

const TMP_TOY_DATA = Array(5).fill({
  name: {
    first: "John",
    last: "Doe",
    username: "johndoe",
  },
  email: "johndoe@me.com",
  picture: {
    thumbnail:
      "https://fastly.picsum.photos/id/474/200/300.jpg?hmac=ujW-ONkfEKNYQaIt8c6e2WaF1LWjpave8A5pHryyQs0",
  },
});

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
      <AddressBook users={TMP_TOY_DATA} />
    </main>
  );
}
