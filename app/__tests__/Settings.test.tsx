import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Settings from "../settings/page";
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
});

test("Nationality render", async () => {
  render(<Settings />);
  const buttons = screen.getAllByTestId(/nationality-button-*/);
  expect(buttons).toHaveLength(4);
});

test("selecting a nationality updates localStorage", () => {
  const spy = vi.spyOn(Storage.prototype, "setItem");

  render(<Settings />);

  const swissButton = screen.getByTestId("nationality-button-CH");
  fireEvent.click(swissButton);

  expect(spy).toHaveBeenCalledWith(
    "selectedCodes",
    JSON.stringify({ CH: true }),
  );
  expect(swissButton.classList.contains("border-blue-500")).toBeTruthy();

  const spanishButton = screen.getByTestId("nationality-button-ES");
  fireEvent.click(spanishButton);

  expect(spy).toHaveBeenCalledWith(
    "selectedCodes",
    JSON.stringify({ CH: true, ES: true }),
  );
  expect(spanishButton.classList.contains("border-blue-500")).toBeTruthy();
});
