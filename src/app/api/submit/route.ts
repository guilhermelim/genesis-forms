import { NextResponse } from "next/server";
import { Member } from "@/models/Member";
import { Service } from "@/models/Service";
import { Registration } from "@/models/Registration";
import database from "@/lib/database";

export async function POST(request: Request) {
  try {
    await database.connect();

    const { memberId, serviceId } = await request.json();

    // Validações
    await validateMember(memberId);
    await validateService(serviceId);
    await validateExistingRegistration(memberId, serviceId);

    // Cria o novo registro
    const newRegistration = await createRegistration(memberId, serviceId);

    return NextResponse.json(
      { success: true, registration: newRegistration },
      { status: 200 }
    );
  } catch (error) {
    return handleErrorResponse(error);
  }
}

// Funções auxiliares
async function validateMember(memberId: string) {
  const member = await Member.findById(memberId);
  if (!member) {
    throw new ErrorWithStatus("Membro não encontrado", 404);
  }
  return member;
}

async function validateService(serviceId: string) {
  const service = await Service.findById(serviceId);
  if (!service) {
    throw new ErrorWithStatus("Serviço não encontrado", 404);
  }
  return service;
}

async function validateExistingRegistration(
  memberId: string,
  serviceId: string
) {
  const existingMemberRegistration = await Registration.findOne({
    member: memberId,
  });
  if (existingMemberRegistration) {
    throw new ErrorWithStatus(
      "Este membro já está registrado em um serviço",
      400
    );
  }

  const existingServiceRegistration = await Registration.findOne({
    service: serviceId,
  });
  if (existingServiceRegistration) {
    throw new ErrorWithStatus(
      "Este serviço já está registrado por outro membro",
      400
    );
  }
}

async function createRegistration(memberId: string, serviceId: string) {
  const newRegistration = new Registration({
    member: memberId,
    service: serviceId,
  });
  await newRegistration.save();
  return newRegistration;
}

function handleErrorResponse(error: unknown) {
  if (error instanceof ErrorWithStatus) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status }
    );
  }
  console.error("Error:", error);
  return NextResponse.json(
    { error: "Erro ao processar a solicitação" },
    { status: 500 }
  );
}

// Classe de erro personalizada
class ErrorWithStatus extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
