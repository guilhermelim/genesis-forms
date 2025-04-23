"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Interfaces
interface MemberData {
  id: string;
  name: string;
}

interface ServiceData {
  id: string;
  name: string;
}

interface RegistrationData {
  member: { _id: string; name: string };
  service: { _id: string; name: string };
  date: string;
}

interface DataContextProps {
  members: MemberData[];
  services: ServiceData[];
  registrations: RegistrationData[];
  unavailableMembers: string[];
  unavailableServices: string[];
  loading: boolean;
  error: string | null;
  update: () => Promise<void>;
}

// Contexto
const DataContext = createContext<DataContextProps | undefined>(undefined);

// Hook personalizado para encapsular a lógica de estado e carregamento
const useDataProvider = () => {
  const [members, setMembers] = useState<MemberData[]>([]);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [unavailableMembers, setUnavailableMembers] = useState<string[]>([]);
  const [unavailableServices, setUnavailableServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const update = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/data");
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API");
      }
      const data = await response.json();

      setMembers(data.members);
      setServices(data.services);
      setRegistrations(data.registrations);
      setUnavailableMembers(data.unavailableMembers);
      setUnavailableServices(data.unavailableServices);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    update();
  }, []);

  return {
    members,
    services,
    registrations,
    unavailableMembers,
    unavailableServices,
    loading,
    error,
    update,
  };
};

// Provider
export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const data = useDataProvider();

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

// Hook para consumir o contexto
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext deve ser usado dentro de um DataProvider");
  }
  return context;
};
