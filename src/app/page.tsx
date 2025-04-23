import HomeSection from "@/sections/home/HomeSection";

export default async function Home() {
  return (
    <main className="min-h-screen bg-gray-50 pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-8">
        <HomeSection />
      </div>
    </main>
  );
}
