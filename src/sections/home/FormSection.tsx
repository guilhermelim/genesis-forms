"use client";

import Form from "@/components/Form";

interface FormSectionProps {
  members: { id: string; name: string }[];
  services: { id: string; name: string }[];
  unavailableMembers: string[];
  unavailableServices: string[];
}

export default function FormSection({
  members,
  services,
  unavailableMembers,
  unavailableServices,
}: FormSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-8 mb-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Selecione Membro e Serviço
      </h1>
      <Form
        members={members}
        services={services}
        unavailableMembers={unavailableMembers}
        unavailableServices={unavailableServices}
      />
    </div>
  );
}
