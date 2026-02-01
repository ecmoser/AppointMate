import Image from "next/image";

export default function OrgUsersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Organization & Users</h1>
        <Image
          src="/AppointMateLogo.png"
          alt="AppointMate logo"
          width={100}
          height={100}
        />
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold">Organization</h2>
        <p>Name: Acme Health Clinic</p>
        <p>ID: org_123456</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">Users</h2>
        <ul className="space-y-2">
          <li>Admin – admin@acme.com</li>
          <li>Staff – staff@acme.com</li>
        </ul>
      </div>
    </div>
  );
}
