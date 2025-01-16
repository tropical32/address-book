"use client";

import { useState } from "react";
import Flag from "./Flag";

const FR = "🇫🇷";
const ES = "🇪🇸";
const CH = "🇨🇭";
const GB = "🇬🇧";

/**
 * Retrieves the currently selected nationalities from local storage.
 *
 * The selected nationalities are persisted as a JSON object in local storage
 * under the key "selectedCodes". The JSON object should have the nationality
 * code as the key and a boolean value indicating whether that nationality is
 * selected or not.
 *
 * @returns The currently selected nationalities as a JSON object.
 */
function parseNationalities(): {
  [code: string]: boolean;
} {
  const selectedCodesStringified = localStorage.getItem("selectedCodes") || "";
  try {
    const parsedValue = JSON.parse(selectedCodesStringified);
    const isObject =
      typeof parsedValue === "object" &&
      parsedValue !== null &&
      !Array.isArray(parsedValue);

    if (isObject) return parsedValue;
  } catch {
    return {};
  }

  return {};
}

/**
 * A component that displays a grid of nationality flags.
 *
 * Users can select multiple flags and the selected flags are persisted in
 * local storage.
 *
 * @returns A section element containing the grid of flags.
 */
export function Flags() {
  const [selectedNationalities, setSelectedNationalities] =
    useState(parseNationalities());

  function onNationalityClicked(code: string) {
    const selectedCodesObject = parseNationalities();

    if (selectedCodesObject[code] === true) {
      selectedCodesObject[code] = false;
    } else {
      selectedCodesObject[code] = true;
    }

    setSelectedNationalities(selectedCodesObject);

    const codesStringified = JSON.stringify(selectedCodesObject);
    localStorage.setItem("selectedCodes", codesStringified);
  }

  const nationalities = [
    { code: "CH", description: "Swiss", flag: CH },
    { code: "ES", description: "Spanish", flag: ES },
    { code: "FR", description: "French", flag: FR },
    { code: "GB", description: "British", flag: GB },
  ];

  return (
    <section className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {nationalities.map((nationality) => (
        <Flag
          key={nationality.code}
          description={nationality.description}
          code={nationality.code}
          flag={nationality.flag}
          onClick={onNationalityClicked}
          isSelected={selectedNationalities[nationality.code]}
        />
      ))}
    </section>
  );
}
