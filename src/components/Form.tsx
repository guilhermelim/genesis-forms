"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormProps {
  members: { id: string; name: string }[];
  services: { id: string; name: string }[];
  unavailableMembers: string[];
  unavailableServices: string[];
}

export default function Form({
  members,
  services,
  unavailableMembers,
  unavailableServices,
}: FormProps) {
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberId: selectedMember,
          serviceId: selectedService,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar formulário");
      }

      router.refresh();
      setSelectedMember("");
      setSelectedService("");
    } catch (err: unknown) {
      setError(
        (err as Error).message || "Ocorreu um erro ao enviar o formulário"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="member"
          className="block text-sm font-medium text-gray-700"
        >
          Membro
        </label>
        <select
          id="member"
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border bg-white text-gray-800"
          required
          disabled={isSubmitting}
        >
          <option value="" className="text-gray-500">
            Selecione um membro
          </option>
          {members.map((member) => (
            <option
              key={member.id}
              value={member.id}
              disabled={unavailableMembers.includes(member.id)}
              className={
                unavailableMembers.includes(member.id)
                  ? "text-gray-500 bg-gray-100"
                  : "text-gray-800 hover:bg-indigo-50"
              }
            >
              {member.name}{" "}
              {unavailableMembers.includes(member.id) && "(Indisponível)"}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="service"
          className="block text-sm font-medium text-gray-700"
        >
          Serviço
        </label>
        <select
          id="service"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border bg-white text-gray-800"
          required
          disabled={isSubmitting}
        >
          <option value="" className="text-gray-500">
            Selecione um serviço
          </option>
          {services.map((service) => (
            <option
              key={service.id}
              value={service.id}
              disabled={unavailableServices.includes(service.id)}
              className={
                unavailableServices.includes(service.id)
                  ? "text-gray-500 bg-gray-100"
                  : "text-gray-800 hover:bg-indigo-50"
              }
            >
              {service.name}{" "}
              {unavailableServices.includes(service.id) && "(Indisponível)"}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting || !selectedMember || !selectedService}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </form>
  );
}
