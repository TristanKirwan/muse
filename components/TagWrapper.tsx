import Tag from "@/components/Tag";

export default function TagWrapper({
  tags,
  showAll = false,
}: {
  tags: string[];
  showAll?: boolean;
}) {
  if (!tags || tags.length === 0) return null;

  let finalTags = tags;
  if (!showAll && tags.length > 3) {
    finalTags = tags.slice(0, 2);
    finalTags.push(`+${tags.length - 2}`);
  }

  return (
    <div className='flex flex-wrap gap-x-2 gap-y-2 mt-auto'>
      {finalTags.map((tag) => (
        <Tag name={tag} key={`tag-wrapper-${tag}`} />
      ))}
    </div>
  );
}
