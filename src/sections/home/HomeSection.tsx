"use client";

import { useDataContext } from "@/context/DataContext";
import BannerSection from "./BannerSection";
import LifeGroupInfo from "./LifeGroupInfo";
import FormSection from "./FormSection";
import RecentRegistrations from "./RecentRegistrations";
import ServiceGuide from "./ServiceGuide";

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 pb-12 flex flex-col items-center justify-center">
      <p className="text-lg font-medium text-gray-700">Carregando dados...</p>
      <div className="mt-4 w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
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
