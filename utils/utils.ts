import { NationalityCode } from "@/components/Nationality/Nationalities";

/**
 * Converts a nationality code to its corresponding flag emoji.
 *
 * This function takes a `NationalityCode` and returns the corresponding
 * flag emoji as a string. If the code does not match any known nationality,
 * it returns an empty string.
 *
 * Explanation: https://dev.to/jorik/country-code-to-flag-emoji-a21
 *
 * @param {NationalityCode} code - The nationality code to convert.
 * @returns {string} The corresponding flag emoji or an empty string if
 * the code is not recognized.
 */
export function nationalityCodeToFlag(code: NationalityCode) {
  const codePoints = code
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
}

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
export function parseNationalitiesLocalStorage(): {
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

export function getSelectedNationalities() {
  const selectedCodes = parseNationalitiesLocalStorage();
  const selectedNationalities = Object.keys(selectedCodes).filter(
    (code) => selectedCodes[code],
  );
  return selectedNationalities;
}

export function constructSearchParam(
  selectedNationalities: string[],
  page: number,
) {
  const url = new URL("https://randomuser.me/api/");
  const selectedNationalitiesJoined = selectedNationalities.join(",");

  url.searchParams.append("results", "50");
  url.searchParams.append("page", page.toString());
  url.searchParams.append("nat", selectedNationalitiesJoined);

  return url;
}
