import Arrow from "./types/Arrow";
import Chevron from "./types/Chevron";
import Plus from "./types/Plus";

export type IconItemProps = {
  className?: string;
  pathClass?: string;
};

export const iconsMap = {
  plus: Plus,
  arrow: Arrow,
  chevron: Chevron,
};

export type IconType = keyof typeof iconsMap;

type IconProps = {
  type: IconType;
  className?: string;
  pathClass?: string;
  idAddition?: string;
};

export const Icon = ({
  type,
  className,
  pathClass,
  ...rest
}: IconProps): React.JSX.Element | null => {
  const IconComp = iconsMap[type];
  if (!IconComp) return null;
  return <IconComp className={className} pathClass={pathClass} {...rest} />;
};

export default Icon;
