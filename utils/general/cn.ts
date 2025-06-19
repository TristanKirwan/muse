import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const tailwindMergeAdditionalConfig = extendTailwindMerge({
  extend: {
    classGroups: {
      //  @ts-expect-error text key seems the job we want but doesn't exist in TS.
      text: [
        // Add your custom color class here to the `text` group
        "text-no-change-foreground",
      ],
    },
    theme: {
      color: [
        "foreground",
        "background",
        "green",
        "no-change-foreground",
        "no-change-background",
      ],
      text: [
        "heading-1",
        "heading-2",
        "heading-3",
        "heading-4",
        "heading-5",
        "heading-6",
        "paragraph",
        "small",
        "extra-small",
      ],
    },
  },
});

export default function cn(...inputs: ClassValue[]) {
  return tailwindMergeAdditionalConfig(clsx(inputs));
}
