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