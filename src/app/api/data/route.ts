import { NextResponse } from "next/server";
import { Member } from "@/models/Member";
import { Service } from "@/models/Service";
import { Registration } from "@/models/Registration";
import database from "@/lib/database";

export async function GET() {
  try {
    await database.connect();

    const [members, services, registrations] = await Promise.all([
      Member.find(),
      Service.find(),
      Registration.find().populate("member").populate("service"),
    ]);

    const unavailableMembers = registrations.map((r) =>
      r.member._id.toString()
    );
    const unavailableServices = registrations.map((r) =>
      r.service._id.toString()
    );

    return NextResponse.json({
      members: members.map((m) => ({ id: m._id.toString(), name: m.name })),
      services: services.map((s) => ({ id: s._id.toString(), name: s.name })),
      registrations: registrations.map((r) => ({
        member: {
          _id: r.member._id.toString(),
          name: r.member.name,
        },
        service: {
          _id: r.service._id.toString(),
          name: r.service.name,
        },
        date: r.date,
      })),
      unavailableMembers,
      unavailableServices,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Database error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
