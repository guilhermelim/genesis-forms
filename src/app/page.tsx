import BannerSection from "@/sections/home/BannerSection";
import LifeGroupInfo from "@/sections/home/LifeGroupInfo";
import FormSection from "@/sections/home/FormSection";
import RecentRegistrations from "@/sections/home/RecentRegistrations";
import ServiceGuide from "@/sections/home/ServiceGuide";
import { Member } from "@/models/Member";
import { Service } from "@/models/Service";
import { Registration } from "@/models/Registration";
import database from "@/lib/database";

export default async function Home() {
  await database.connect();

  // Busca dados do banco
  const [members, services, registrations] = await Promise.all([
    Member.find(),
    Service.find(),
    Registration.find().populate("member").populate("service"),
  ]);

  const unavailableMembers = registrations.map((r) => r.member._id.toString());
  const unavailableServices = registrations.map((r) =>
    r.service._id.toString()
  );

  return (
    <main className="min-h-screen bg-gray-50 pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-8">
        <BannerSection />
        <LifeGroupInfo />

        <FormSection
          members={members.map((m) => ({ id: m._id.toString(), name: m.name }))}
          services={services.map((s) => ({
            id: s._id.toString(),
            name: s.name,
          }))}
          unavailableMembers={unavailableMembers}
          unavailableServices={unavailableServices}
        />

        <RecentRegistrations registrations={registrations} />

        <ServiceGuide />
      </div>
    </main>
  );
}
