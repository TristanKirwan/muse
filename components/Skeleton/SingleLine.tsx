import cn from "@/utils/general/cn";

export default function SingleLine({
  className,
  heightVariation = "default",
}: {
  className?: string;
  heightVariation?: "large" | "default" | "small";
}) {
  return (
    <span
      className={cn(
        "inline-block bg-background-tint-2 rounded-sm ",
        heightVariation === "large" && "h-4",
        heightVariation === "small" && "h-2",
        heightVariation === "default" && "h-3",
        className
      )}
    />
  );
}
