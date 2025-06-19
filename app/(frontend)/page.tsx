import config from "@payload-config";
import { getPayload } from "payload";

import CardSection from "@/sections/CardSection";
import HomeHero from "@/sections/HomeHero";
import mapInspirationItem from "@/utils/mapping/mapInspirationitem";

export default async function Home() {
  const payload = await getPayload({ config });

  // TODO: add pagination.2
  const inspirationResult = await payload.find({
    collection: "inspiration",
    limit: 100,
  });

  const inspirationItems = inspirationResult.docs;
  const mappedInspirationItems = inspirationItems.map(mapInspirationItem);

  return (
    <main>
      <HomeHero />
      <CardSection items={mappedInspirationItems} />
    </main>
  );
}
