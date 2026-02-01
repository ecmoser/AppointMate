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
            <Link 
              href="/" 
              className="px-4 py-2 rounded transition-all duration-200 hover:bg-gray-800 hover:border-2 hover:border-white active:bg-gray-700"
            >
              Dashboard
            </Link>
            <Link 
              href="/agents" 
              className="px-4 py-2 rounded transition-all duration-200 hover:bg-gray-800 hover:border-2 hover:border-white active:bg-gray-700"
            >
              AI Agents
            </Link>
            <Link 
              href="/contacts" 
              className="px-4 py-2 rounded transition-all duration-200 hover:bg-gray-800 hover:border-2 hover:border-white active:bg-gray-700"
            >
              Contacts & Leads
            </Link>
            <Link 
              href="/campaigns/sms" 
              className="px-4 py-2 rounded transition-all duration-200 hover:bg-gray-800 hover:border-2 hover:border-white active:bg-gray-700"
            >
              SMS Campaigns
            </Link>
            <Link 
              href="/campaigns/voice" 
              className="px-4 py-2 rounded transition-all duration-200 hover:bg-gray-800 hover:border-2 hover:border-white active:bg-gray-700"
            >
              Voice Campaigns
            </Link>
            <Link 
              href="/numbers" 
              className="px-4 py-2 rounded transition-all duration-200 hover:bg-gray-800 hover:border-2 hover:border-white active:bg-gray-700"
            >
              Phone Numbers
            </Link>
            <Link 
              href="/org-users" 
              className="px-4 py-2 rounded transition-all duration-200 hover:bg-gray-800 hover:border-2 hover:border-white active:bg-gray-700"
            >
              Organizations & Users
            </Link>
            <Link 
              href="/calendar" 
              className="px-4 py-2 rounded transition-all duration-200 hover:bg-gray-800 hover:border-2 hover:border-white active:bg-gray-700"
            >
              Calendar
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-8 bg-gray-100">{children}</main>
      </body>
    </html>
  );
}
