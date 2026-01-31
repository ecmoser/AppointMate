'use client';

import { useState } from 'react';

interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  time?: string;
  description?: string;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getEventsForDate = (day: number) => {
    return events.filter(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Appointments Calendar</h1>

      <div className="bg-white p-6 rounded shadow">
        {/* Month Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={previousMonth}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            ← Previous
          </button>
          <h2 className="text-2xl font-bold">{monthName}</h2>
          <button
            onClick={nextMonth}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next →
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-bold text-gray-600">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`min-h-24 p-2 border rounded ${
                day === null ? 'bg-gray-50' : 'bg-white border-gray-200'
              }`}
            >
              {day && (
                <div>
                  <div className="font-bold text-sm mb-1">{day}</div>
                  <div className="space-y-1">
                    {getEventsForDate(day).map((event) => (
                      <div
                        key={event.id}
                        className="bg-blue-100 text-blue-800 text-xs p-1 rounded truncate"
                        title={event.title}
                      >
                        {event.time && <span className="font-semibold">{event.time}</span>}
                        {event.title && <span> {event.title}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-6 text-gray-500 text-sm">
          <p>📅 To add events, use the setEvents function with CalendarEvent objects.</p>
          <p>Each event needs: id, date, and title. Optional: time and description.</p>
        </div>
      </div>
    </div>
  );
}
