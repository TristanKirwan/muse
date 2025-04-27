import CardSection from "@/sections/CardSection";

export default function Home() {
  return (
    <main className='flex flex-col gap-y-8 pt-20 container'>
      <h1 className='text-heading-1'>Your inspirations</h1>
      <CardSection />
    </main>
  );
}
