import { NextResponse } from "next/server";
import { Member } from "@/models/Member";
import { Service } from "@/models/Service";
import { Registration } from "@/models/Registration";
import database from "@/lib/database";

// Interfaces organizadas no topo
interface MemberData {
  _id: string;
  name: string;
}

interface ServiceData {
  _id: string;
  name: string;
}

interface RegistrationData {
  member: { _id: string; name: string };
  service: { _id: string; name: string };
  date: string;
}

interface FormattedService {
  id: string;
  name: string;
}

interface FormattedRegistration {
  member: {
    id: string;
    name: string;
  };
  service: {
    id: string;
    name: string;
  };
  date: string;
}

// Função principal da rota
export async function GET() {
  try {
    await database.connect();

    const [members, services, registrations] = await fetchAllData();

    const unavailableMembers = extractUnavailableIds(registrations, "member");
    const unavailableServices = extractUnavailableIds(registrations, "service");

    return NextResponse.json({
      members: formatMembers(members),
      services: formatServices(services),
      registrations: formatRegistrations(registrations),
      unavailableMembers,
      unavailableServices,
    });
  } catch (error) {
    return handleErrorResponse(error);
  }
}

// Funções auxiliares
async function fetchAllData() {
  return Promise.all([
    Member.find(),
    Service.find(),
    Registration.find().populate("member").populate("service"),
  ]);
}

function extractUnavailableIds(
  registrations: RegistrationData[],
  key: "member" | "service"
): string[] {
  return registrations.map((registration) => registration[key]._id.toString());
}

function formatMembers(members: MemberData[]): { id: string; name: string }[] {
  return members
    .map((member) => ({
      id: member._id.toString(),
      name: member.name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function formatServices(services: ServiceData[]): FormattedService[] {
  return services.map((service) => ({
    id: service._id.toString(),
    name: service.name,
  }));
}

function formatRegistrations(
  registrations: RegistrationData[]
): FormattedRegistration[] {
  return registrations.map((registration) => ({
    member: {
      id: registration.member._id.toString(),
      name: registration.member.name,
    },
    service: {
      id: registration.service._id.toString(),
      name: registration.service.name,
    },
    date: registration.date,
  }));
}

function handleErrorResponse(error: unknown) {
  return NextResponse.json(
    {
      error: "Database error",
      details: error instanceof Error ? error.message : String(error),
    },
    { status: 500 }
  );
}
