export default function VoiceCampaignsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Voice Campaigns</h1>

      <button className="mb-4 px-4 py-2 bg-black text-white rounded">
        + Create Voice Campaign
      </button>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold">Missed Appointment Follow-up</h2>
        <p className="text-sm text-gray-600">Using ElevenLabs Voice · Status: Running</p>
      </div>
    </div>
  );
}
