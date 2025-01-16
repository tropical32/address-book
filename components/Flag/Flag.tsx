interface FlagProps {
  flag: string;
  description: string;
  code: string;
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
 *
 * @returns The rendered component.
 */
export default function Flag({ flag, description, code }: FlagProps) {
  return (
    <div
      key={code}
      className="p-5 rounded-xl border cursor-pointer transition-shadow duration-200 hover:shadow-lg"
    >
      <div className="text-sm font-medium">
        <div className="flex flex-col items-center">
          <span className="text-5xl">{flag}</span>
          <span className="text-2xl font-bold">{code}</span>
          <div className="text-md">{description}</div>
        </div>
      </div>
    </div>
  );
}
