import type { Inspiration } from "@/payload-types";
import filterEmptyValues from "@/utils/general/filterEmptyValues";

export default function mapInspirationItem(item: Inspiration) {
  return {
    id: item.id,
    title: item.title,
    shortDescription: item.description_preview,
    longDescription: item.description,
    type: item.type,
    tags: item.tags?.map((tag) => tag.tag).filter(filterEmptyValues) || [],
    images:
      item.images?.map((image) => image.image).filter(filterEmptyValues) || [],
    updatedAt: item.updatedAt,
    createdAt: item.createdAt,
  };
}
