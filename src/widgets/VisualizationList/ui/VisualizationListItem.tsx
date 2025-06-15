import { cn } from "../../../shared/utiles/cn/cn";

interface VisualizationListItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  letter: string;
  isNotMatch?: boolean;
  isChosen?: boolean;
  isInSearch?: boolean;
  isHovered?: boolean;
}

const getColorClass = (letter: string) => {
  const lowerLater = letter.toLocaleLowerCase();
  switch (lowerLater) {
    case "c":
      return "cysteine";
    case "a":
    case "i":
    case "l":
    case "m":
    case "f":
    case "w":
    case "y":
    case "v":
    case "p":
      return "hydrophobic";
    case "d":
    case "e":
      return "negativelyCharged";
    case "k":
    case "r":
      return "positivelyCharged";
    case "s":
    case "t":
    case "h":
    case "n":
    case "q":
      return "polarUncharged";
    default:
      return "";
  }
};

export const VisualizationListItem = ({
  letter,
  isNotMatch,
  isChosen,
  isInSearch,
  isHovered,
  ...props
}: VisualizationListItemProps) => {
  return (
    <li
      className={cn(
        `bg-${getColorClass(
          letter
        )} w-10 h-10 flex justify-center items-center text-2xl border cursor-pointer select-none`,
        isNotMatch && "bg-transparent text-error",
        isChosen && "opacity-50",
        isInSearch && "ring-3 ring-primary ring-offset-1",
        isHovered && "hover:opacity-50"
      )}
      {...props}
    >
      {letter}
    </li>
  );
};
