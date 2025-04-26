import Filter from "@/components/Filter";

const mockFilters = [
  {
    label: "All",
    value: "firstall",
  },
  {
    label: "Web",
    value: "web",
  },
  {
    label: "Art",
    value: "art",
  },
  {
    label: "Movies",
    value: "movies",
  },
  {
    label: "Games",
    value: "games",
  },
  {
    label: "Music",
    value: "music",
  },
];

export default function Home() {
  return (
    <main className='flex flex-col gap-y-8 pt-20 container'>
      <h1 className='text-heading-1'>Your inspirations</h1>
      <Filter possibleFilters={mockFilters} />
    </main>
  );
}
