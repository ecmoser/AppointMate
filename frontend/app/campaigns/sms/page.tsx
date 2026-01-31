export default function SmsCampaignsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">SMS Campaigns</h1>

      <button className="mb-4 px-4 py-2 bg-black text-white rounded">
        + Create SMS Campaign
      </button>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold">Appointment Reminders</h2>
        <p className="text-sm text-gray-600">Sent to 48 contacts · Status: Active</p>
      </div>
    </div>
  );
}
