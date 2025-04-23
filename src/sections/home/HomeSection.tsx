"use client";

import { useDataContext } from "@/context/DataContext";
import BannerSection from "./BannerSection";
import LifeGroupInfo from "./LifeGroupInfo";
import FormSection from "./FormSection";
import RecentRegistrations from "./RecentRegistrations";
import ServiceGuide from "./ServiceGuide";

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-8">
        <div className="text-center py-8">Carregando dados...</div>
      </div>
    </div>
  );
}

function ErrorScreen({ error }: { error: string }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-8">
        <div className="text-red-500 text-center py-8">Erro: {error}</div>
      </div>
    </div>
  );
}

export default function HomeSection() {
  const { loading, error } = useDataContext();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-8">
        <BannerSection />
        <LifeGroupInfo />
        <FormSection />
        <RecentRegistrations />
        <ServiceGuide />
      </div>
    </main>
  );
}
