"use client";

import Form from "@/components/Form";
import { useDataContext } from "@/context/DataContext";

export default function FormSection() {
  const { services, unavailableServices } = useDataContext();

  const allServicesUnavailable = services.length === unavailableServices.length;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-8 mb-8">
      {allServicesUnavailable ? (
        <div className="text-center text-gray-700">
          <p className="text-lg font-medium">
            Todos os serviços já foram escolhidos!
          </p>
          <p className="mt-2 text-sm">
            Por favor, volte no próximo encontro para realizar um novo cadastro.
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Escolha como você deseja servir neste encontro
          </h1>
          <Form />
        </>
      )}
    </div>
  );
}
