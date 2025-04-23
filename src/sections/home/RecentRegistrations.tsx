"use client";

import { useState } from "react";
import { useDataContext } from "@/context/DataContext";

interface Registration {
  member: {
    name: string;
  };
  service: {
    name: string;
  };
  date: string | number | Date;
  observations?: string; // Adicionado o campo opcional
}

function RegistrationItem({ registration }: { registration: Registration }) {
  return (
    <li className="bg-gray-100 p-3 rounded-lg">
      <p className="text-gray-800">
        <span className="font-medium">{registration.member.name}</span> -{" "}
        {registration.service.name}
      </p>
      <p className="text-sm text-gray-500">
        {new Date(registration.date).toLocaleString()}
      </p>
      {/* Exibe o campo de observações, se estiver presente */}
      {registration.observations && (
        <p className="text-sm text-gray-700 mt-2">
          <span className="font-medium">Observações:</span>{" "}
          {registration.observations}
        </p>
      )}
    </li>
  );
}

function ShowMoreButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="mt-4 text-center">
      <button
        onClick={onClick}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Exibir mais
      </button>
    </div>
  );
}

export default function RecentRegistrations() {
  const { registrations } = useDataContext();
  const [showAll, setShowAll] = useState(false);

  if (!registrations || registrations.length === 0) {
    return null; // Não renderiza nada se não houver registros
  }

  // Ordena os registros da data mais recente para a mais antiga
  const sortedRegistrations = [...registrations].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const displayedRegistrations = showAll
    ? sortedRegistrations
    : sortedRegistrations.slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-8 mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Registros Recentes
      </h2>
      <ul className="space-y-2">
        {displayedRegistrations.map((registration, index) => (
          <RegistrationItem key={index} registration={registration} />
        ))}
      </ul>
      {registrations.length > 5 && !showAll && (
        <ShowMoreButton onClick={() => setShowAll(true)} />
      )}
    </div>
  );
}
