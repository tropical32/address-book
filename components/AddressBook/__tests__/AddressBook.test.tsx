import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { User } from "@/types/types";
import { test, expect, afterEach } from "vitest";
import AddressBook from "../AddressBook";

afterEach(() => {
  cleanup();
});

const mockUsers: User[] = [
  {
    email: "john@example.com",
    login: { username: "john_doe" },
    name: { first: "John", last: "Doe" },
    picture: { thumbnail: "https://example.com" },
    nat: "US",
    phone: "123456789",
    cell: "987654321",
    location: {
      city: "New York",
      state: "NY",
      postcode: "10001",
      street: { name: "Main St" },
    },
  },
  {
    email: "jane@example.com",
    login: { username: "jane_doe" },
    name: { first: "Jane", last: "Doe" },
    picture: { thumbnail: "https://example.com" },
    nat: "US",
    phone: "987654321",
    cell: "123456789",
    location: {
      city: "Los Angeles",
      state: "CA",
      postcode: "90001",
      street: { name: "Elm St" },
    },
  },
];

test("renders a list of users and selects a user to show dialog", async () => {
  render(<AddressBook users={mockUsers} />);

  expect(await screen.findAllByTestId("address-book-entry")).toHaveLength(2);

  mockUsers.forEach(async (user) => {
    expect(
      await screen.findByText(`${user.name.first} ${user.name.last}`),
    ).toBeTruthy();
  });

  const johnEntry = await screen.findByText("John Doe");
  fireEvent.click(johnEntry);

  const dialogElement = screen.queryByTestId("dialog");
  expect(dialogElement).toBeTruthy();
  expect(screen.getByText("987654321")).toBeTruthy();
});
