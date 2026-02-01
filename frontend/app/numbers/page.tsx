import Image from "next/image";

export default function PhoneNumbersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Phone Numbers</h1>
        <Image
          src="/AppointMateLogo.png"
          alt="AppointMate logo"
          width={100}
          height={100}
        />
      </div>

      <button className="mb-4 px-4 py-2 bg-black text-white rounded">
        + Buy New Number
      </button>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Number</th>
            <th className="p-3 text-left">Assigned Agent</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3">+1 (555) 111-2222</td>
            <td className="p-3">Front Desk Scheduler Bot</td>
            <td className="p-3">Active</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
