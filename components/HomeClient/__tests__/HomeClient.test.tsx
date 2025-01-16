import { cleanup, render, screen } from "@testing-library/react";
import HomeClient from "../HomeClient";
import { expect, test, vi } from "vitest";
import { afterEach, beforeEach } from "vitest";
import * as SWR from "swr";

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

test("useSWR is called", async () => {
  render(<HomeClient />);

  const mocked = vi.spyOn(SWR, "default");
  expect(mocked).toHaveBeenCalledTimes(1);
});
