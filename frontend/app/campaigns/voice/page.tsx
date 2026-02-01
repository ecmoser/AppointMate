import Image from "next/image";

export default function VoiceCampaignsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Voice Campaigns</h1>
        <Image
          src="/AppointMateLogo.png"
          alt="AppointMate logo"
          width={100}
          height={100}
        />
      </div>

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
