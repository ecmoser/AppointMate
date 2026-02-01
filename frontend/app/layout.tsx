// app/layout.tsx
import "./globals.css";
import Link from "next/link";

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <aside className="w-64 bg-black text-white p-6">
          <h2 className="text-xl font-bold mb-6">AppointMate</h2>
          <nav className="flex flex-col gap-3">
            <Link href="/">Dashboard</Link>
            <a href="/agents">AI Agents</a>
            <a href="/contacts">Contacts & Leads</a>
            <a href="/campaigns/sms">SMS Campaigns</a>
            <a href="/campaigns/voice">Voice Campaigns</a>
            <a href="/numbers">Phone Numbers</a>
            <a href="/org-users">Organizations & Users</a>
            <a href="/calendar">Calendar</a>
          </nav>
        </aside>
        <main className="flex-1 p-8 bg-gray-100">{children}</main>
      </body>
    </html>
  );
}
