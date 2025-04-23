interface RecentRegistrationsProps {
  registrations: {
    member: { name: string };
    service: { name: string };
    date: string;
  }[];
}

export default function RecentRegistrations({
  registrations,
}: RecentRegistrationsProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-8 mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Registros Recentes
      </h2>
      <ul className="space-y-2">
        {registrations.slice(0, 5).map((registration, index) => (
          <li key={index} className="bg-gray-100 p-3 rounded-lg">
            <p className="text-gray-800">
              <span className="font-medium">{registration.member.name}</span> -{" "}
              {registration.service.name}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(registration.date).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
