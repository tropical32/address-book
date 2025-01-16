import { nationalityCodeToFlag } from "@/utils/utils";
import { NationalityCode } from "./Nationalities";

interface NationalityProps {
  nationalityCode: NationalityCode;
  description: string;
  code: string;
  onClick: (code: string) => void;
  isSelected: boolean;
}

/**
 * A single flag component in the settings page.
 *
 * This component displays a single nationality flag in the settings page in a
 * compact format. It displays the flag, its code, and a description.
 *
 * @param {FlagProps} props The component props.
 * @param {string} props.flag The flag emoji.
 * @param {string} props.description A description of the flag.
 * @param {string} props.code The code of the flag.
 * @param {(code: string) => void} props.onClick The handler to be called when the flag is clicked.
 * @param {boolean} props.isSelected Whether the nationality is included for filtering
 *
 * @returns The rendered component.
 */
export default function Nationality({
  nationalityCode,
  description,
  code,
  onClick,
  isSelected,
}: NationalityProps) {
  return (
    <button
      data-testid={`nationality-button-${code}`}
      aria-pressed={isSelected}
      aria-label={`Select ${description} nationality`}
      onClick={() => onClick(code)}
      key={code}
      className={`
        ${isSelected ? "border-blue-500" : ""} 
        p-5
        rounded-xl
        border
        cursor-pointer
        transition-shadow
        duration-200
        hover:shadow-lg
      `}
    >
      <div className="flex flex-col items-center text-sm font-medium">
        <span className="text-5xl" role="img">
          {nationalityCodeToFlag(nationalityCode)}
        </span>
        <span className="text-2xl font-bold">{code}</span>
        <span className="text-md">{description}</span>
      </div>
    </button>
  );
}
