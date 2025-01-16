import { cleanup, render, screen, waitFor } from "@testing-library/react";
import HomeClient from "../HomeClient";
import { expect, test, vi } from "vitest";
import { afterEach, beforeEach } from "vitest";

beforeEach(() => {
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;

  vi.mock("swr", () => ({
    default: vi.fn().mockReturnValue({
      mutate: vi.fn(),
      isLoading: false,
      data: [],
      error: null,
    }),
  }));
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.unmock("swr");
});

test("Searchbox presence", async () => {
  render(<HomeClient />);
  expect(await screen.findByRole("searchbox")).toBeTruthy();
});

test("Loading indicator is displayed when fetching data", async () => {
  vi.mock("swr", () => ({
    default: vi.fn().mockReturnValue({
      mutate: vi.fn(),
      isLoading: true,
      data: [],
      error: null,
    }),
  }));

  render(<HomeClient />);
  const loadingIndicator = await screen.findByTestId("loading-indicator");
  expect(loadingIndicator).toBeTruthy();
});

test("fetch real data", async () => {
  vi.unmock("swr");
  render(<HomeClient />);

  await waitFor(
    async () => {
      const addressBookEntry =
        await screen.findAllByTestId("address-book-entry");
      return addressBookEntry;
    },
    { timeout: 5000 },
  );

  const addressBookEntries = await screen.findAllByTestId("address-book-entry");
  expect(addressBookEntries).toHaveLength(50);
});
