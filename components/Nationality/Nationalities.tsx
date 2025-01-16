"use client";

import { useEffect, useState } from "react";
import Nationality from "./Nationality";
import { parseNationalitiesLocalStorage } from "@/utils/utils";

export enum NationalityCode {
  FR = "FR",
  ES = "ES",
  CH = "CH",
  GB = "GB",
}

const NATIONALITY_SETTINGS = [
  { code: NationalityCode.CH, description: "Swiss" },
  { code: NationalityCode.ES, description: "Spanish" },
  { code: NationalityCode.FR, description: "French" },
  { code: NationalityCode.GB, description: "British" },
];

/**
 * A component that displays a grid of nationality flags.
 *
 * Users can select multiple flags and the selected flags are persisted in
 * local storage.
 *
 * @returns A section element containing the grid of flags.
 */
export default function Nationalities() {
  const [selectedNationalities, setSelectedNationalities] = useState<{
    [code: string]: boolean;
  }>({});

  useEffect(() => {
    setSelectedNationalities(parseNationalitiesLocalStorage());
  }, []);

  function onNationalityClicked(code: string) {
    const selectedCodesObject = parseNationalitiesLocalStorage();

    if (selectedCodesObject[code] === true) {
      selectedCodesObject[code] = false;
    } else {
      selectedCodesObject[code] = true;
    }

    setSelectedNationalities(selectedCodesObject);

    const codesStringified = JSON.stringify(selectedCodesObject);
    localStorage.setItem("selectedCodes", codesStringified);
  }

  return (
    <section className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {NATIONALITY_SETTINGS.map((nationality) => (
        <Nationality
          key={nationality.code}
          description={nationality.description}
          code={nationality.code}
          nationalityCode={nationality.code}
          onClick={onNationalityClicked}
          isSelected={selectedNationalities[nationality.code]}
        />
      ))}
    </section>
  );
}
