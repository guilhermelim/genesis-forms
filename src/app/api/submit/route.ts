import { NextResponse } from "next/server";
import { Member } from "@/models/Member";
import { Service } from "@/models/Service";
import { Registration } from "@/models/Registration";
import database from "@/lib/database";

export async function POST(request: Request) {
  try {
    await database.connect();

    const { memberId, serviceId } = await request.json();

    // Verifica se o membro existe
    const member = await Member.findById(memberId);
    if (!member) {
      return NextResponse.json(
        { error: "Membro não encontrado" },
        { status: 404 }
      );
    }

    // Verifica se o serviço existe
    const service = await Service.findById(serviceId);
    if (!service) {
      return NextResponse.json(
        { error: "Serviço não encontrado" },
        { status: 404 }
      );
    }

    // Verifica se o membro já está registrado
    const existingMemberRegistration = await Registration.findOne({
      member: memberId,
    });
    if (existingMemberRegistration) {
      return NextResponse.json(
        { error: "Este membro já está registrado em um serviço" },
        { status: 400 }
      );
    }

    // Verifica se o serviço já está registrado
    const existingServiceRegistration = await Registration.findOne({
      service: serviceId,
    });
    if (existingServiceRegistration) {
      return NextResponse.json(
        { error: "Este serviço já está registrado por outro membro" },
        { status: 400 }
      );
    }

    // Cria o novo registro
    const newRegistration = new Registration({
      member: memberId,
      service: serviceId,
    });

    await newRegistration.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Erro ao processar a solicitação" },
      { status: 500 }
    );
  }
}
