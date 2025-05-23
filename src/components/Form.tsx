"use client";

import { useState } from "react";
import { useDataContext } from "@/context/DataContext";

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      {message}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  unavailableOptions,
  isSubmitting,
  hideUnavailable = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { id: string; name: string }[];
  unavailableOptions: string[];
  isSubmitting: boolean;
  hideUnavailable?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border bg-white text-gray-800"
        required
        disabled={isSubmitting}
      >
        <option value="">Selecione {label.toLowerCase()}</option>
        {options
          .filter(
            (option) =>
              !hideUnavailable || !unavailableOptions.includes(option.id)
          )
          .map((option) => (
            <option
              key={option.id}
              value={option.id}
              disabled={
                !hideUnavailable && unavailableOptions.includes(option.id)
              }
            >
              {option.name}{" "}
              {!hideUnavailable &&
                unavailableOptions.includes(option.id) &&
                "(Indisponível)"}
            </option>
          ))}
      </select>
    </div>
  );
}

function SubmitButton({
  isSubmitting,
  disabled,
}: {
  isSubmitting: boolean;
  disabled: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
    >
      {isSubmitting ? "Enviando..." : "Enviar"}
    </button>
  );
}

export default function Form({
  hideUnavailable = false,
}: {
  hideUnavailable?: boolean;
}) {
  const { members, services, unavailableMembers, unavailableServices, update } =
    useDataContext();

  const [selectedMember, setSelectedMember] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [observations, setObservations] = useState(""); // Novo estado para o campo de texto
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Obter o nome do serviço selecionado
  const selectedServiceName = services.find(
    (service) => service.id === selectedService
  )?.name;

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
          observations:
            selectedServiceName === "7:30h - Adoração"
              ? observations
              : undefined, // Inclui observações apenas se o serviço for "7:30h - Adoração"
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar formulário");
      }

      await update(); // Atualiza os dados após o envio
      setSelectedMember("");
      setSelectedService("");
      setObservations("");
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
      {error && <ErrorMessage message={error} />}

      <SelectField
        id="member"
        label="Membro"
        value={selectedMember}
        onChange={(e) => setSelectedMember(e.target.value)}
        options={members}
        unavailableOptions={unavailableMembers}
        isSubmitting={isSubmitting}
        hideUnavailable={hideUnavailable}
      />

      <SelectField
        id="service"
        label="Serviço"
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
        options={services}
        unavailableOptions={unavailableServices}
        isSubmitting={isSubmitting}
        hideUnavailable={hideUnavailable}
      />

      {/* Campo de texto para observações */}
      {selectedServiceName === "7:30h - Adoração" && (
        <div>
          <label
            htmlFor="observations"
            className="block text-sm font-medium text-gray-700"
          >
            Observações
          </label>
          <textarea
            id="observations"
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border bg-white text-gray-800"
            rows={3}
            placeholder="Digite suas observações aqui"
          />
        </div>
      )}

      <SubmitButton
        isSubmitting={isSubmitting}
        disabled={isSubmitting || !selectedMember || !selectedService}
      />
    </form>
  );
}
