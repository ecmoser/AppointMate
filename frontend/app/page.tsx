export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card title="Active Calls" value="3" />
        <Card title="Appointments Today" value="12" />
        <Card title="SMS Campaigns" value="4" />
        <Card title="Contacts" value="128" />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Recent Activity</h2>
        <ul className="space-y-2">
          <li>📞 Call scheduled appointment for John Doe</li>
          <li>📩 SMS reminder sent to Sarah Lee</li>
          <li>🗓 Appointment rescheduled by Mark Smith</li>
        </ul>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
