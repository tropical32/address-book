import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Home from "../page";
import { expect, test, vi } from "vitest";
import { afterEach, beforeEach } from "vitest";
import { SWRConfig } from "swr";

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

afterEach(async () => {
  cleanup();
  vi.clearAllMocks();
  vi.unmock("swr");
});

test("Searchbox presence", async () => {
  render(
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
      <Home />
    </SWRConfig>,
  );
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

  render(
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
      <Home />
    </SWRConfig>,
  );
  const loadingIndicator = await screen.findByTestId("loading-indicator");
  expect(loadingIndicator).toBeTruthy();
});

test("fetch real data", async () => {
  vi.unmock("swr");
  render(
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
      <Home />
    </SWRConfig>,
  );

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

test("Search functionality filters results", async () => {
  vi.unmock("swr");
  render(
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
      <Home />
    </SWRConfig>,
  );

  await waitFor(
    async () => {
      const addressBookEntry =
        await screen.findAllByTestId("address-book-entry");
      return addressBookEntry;
    },
    { timeout: 5000 },
  );

  const searchInput = await screen.findByTestId("search-input");
  fireEvent.change(searchInput, { target: { value: "r" } });
  const addressBookEntries = await screen.findAllByTestId("address-book-entry");
  expect(addressBookEntries.length).toBeLessThan(50);
  expect(addressBookEntries.length).toBeGreaterThan(1);

  addressBookEntries.forEach((entry) => {
    const name = entry.textContent?.toLowerCase() ?? "";
    expect(name).toMatch(/r/);
  });
});
