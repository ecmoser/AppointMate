export default function AgentsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">AI Agents</h1>

      <button className="mb-4 px-4 py-2 bg-black text-white rounded">
        + Create Agent
      </button>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold">Front Desk Scheduler Bot</h2>
        <p className="text-sm text-gray-600">Voice Agent · ElevenLabs Voice</p>
        <div className="mt-3 flex gap-3">
          <button className="px-3 py-1 bg-blue-500 text-white rounded">Test Call</button>
          <button className="px-3 py-1 bg-gray-300 rounded">View Logs</button>
        </div>
      </div>
    </div>
  );
}
