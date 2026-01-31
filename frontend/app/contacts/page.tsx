export default function ContactsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Contacts & Leads</h1>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3">John Doe</td>
            <td className="p-3">555-1234</td>
            <td className="p-3">john@example.com</td>
            <td className="p-3">Contact</td>
          </tr>
          <tr>
            <td className="p-3">Sarah Lee</td>
            <td className="p-3">555-5678</td>
            <td className="p-3">sarah@example.com</td>
            <td className="p-3">Lead</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
