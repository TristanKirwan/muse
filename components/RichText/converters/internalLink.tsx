import { SerializedLinkNode } from "@payloadcms/richtext-lexical";

export const internalDocToHref = ({
  linkNode,
}: {
  linkNode: SerializedLinkNode;
}) => {
  const { value } = linkNode.fields.doc!;

  const slug = typeof value !== "string" && value.slug;

  return `/${slug}`;
};
