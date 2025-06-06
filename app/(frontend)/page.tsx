import config from "@payload-config";
import { getPayload } from "payload";

import CardSection from "@/sections/CardSection";
import mapInspirationItem from "@/utils/mapping/mapInspirationitem";

export default async function Home() {
  const payload = await getPayload({ config });

  // TODO: add pagination.
  const inspirationResult = await payload.find({
    collection: "inspiration",
    limit: 100,
  });

  const inspirationItems = inspirationResult.docs;
  const mappedInspirationItems = inspirationItems.map(mapInspirationItem);

  console.log("mappedInspirationItems", mappedInspirationItems);

  return (
    <main className='flex flex-col gap-y-8 pt-20 container'>
      <h1 className='text-heading-1'>Your inspirations</h1>
      <CardSection items={mappedInspirationItems} />
    </main>
  );
}
