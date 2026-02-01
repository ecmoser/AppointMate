'use client';
import Image from "next/image";
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
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');

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
    const dayEvents = events.filter(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
    );
    return dayEvents.sort((a, b) => {
      if (!a.time || !b.time) return 0;
      return a.time.localeCompare(b.time);
    });
  };

  const formatTimeWithAMPM = (time: string) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const openAddEventModal = (day: number) => {
    setSelectedDate(day);
    setEventTitle('');
    setEventTime('');
    setEventDescription('');
    setShowModal(true);
  };

  const handleAddEvent = () => {
    if (!eventTitle || !selectedDate) return;

    const eventDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      selectedDate
    );

    const newEvent: CalendarEvent = {
      id: `${selectedDate}-${Date.now()}`,
      date: eventDate,
      title: eventTitle,
      time: eventTime || undefined,
      description: eventDescription || undefined,
    };

    setEvents([...events, newEvent]);
    setShowModal(false);
    setEventTitle('');
    setEventTime('');
    setEventDescription('');
    setSelectedDate(null);
  };

  const openViewEventModal = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowViewModal(true);
  };

  const handleDeleteEvent = () => {
    if (!selectedEvent) return;
    setEvents(events.filter((e) => e.id !== selectedEvent.id));
    setShowViewModal(false);
    setSelectedEvent(null);
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Appointments Calendar</h1>
        <Image
          src="/AppointMateLogo.png"
          alt="AppointMate logo"
          width={100}
          height={100}
        />
      </div>

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
          <div className="flex gap-2">
            <button
              onClick={nextMonth}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Next →
            </button>
            <button
              onClick={() => openAddEventModal(new Date().getDate())}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              + Add Event
            </button>
            <button
              onClick={() => setEvents([])}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
              title="Clear all events (dev)"
            >
              🗑️ Clear
            </button>
          </div>
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
              className={`min-h-24 p-2 border rounded cursor-pointer transition ${
                day === null
                  ? 'bg-gray-50'
                  : 'bg-white border-gray-200 hover:bg-blue-50'
              }`}
              onClick={() => day !== null && openAddEventModal(day)}
            >
              {day && (
                <div>
                  <div className="font-bold text-sm mb-1">{day}</div>
                  <div className="space-y-1">
                    {getEventsForDate(day).map((event) => (
                      <div
                        key={event.id}
                        className="bg-blue-100 text-blue-800 text-xs p-1 rounded truncate hover:bg-blue-200 cursor-pointer"
                        title={event.title}
                        onClick={(e) => {
                          e.stopPropagation();
                          openViewEventModal(event);
                        }}
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
          <p>📅 Click any date or use the "+ Add Event" button to add an event.</p>
          <p>Fill in the event title, time, and optional description.</p>
        </div>
      </div>

      {/* Add Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add Event</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Date *</label>
                <input
                  type="date"
                  value={
                    selectedDate
                      ? `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`
                      : ''
                  }
                  onChange={(e) => {
                    const date = new Date(e.target.value + 'T00:00:00');
                    setSelectedDate(date.getDate());
                    setCurrentDate(new Date(date.getFullYear(), date.getMonth()));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Event Title *</label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g., Meeting, Appointment"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Time</label>
                <input
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  placeholder="Optional notes about the event"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEvent}
                  disabled={!eventTitle}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Add Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Event Modal */}
      {showViewModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-2">{selectedEvent.title}</h2>

            <div className="space-y-3 mb-6">
              {selectedEvent.time && (
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="text-lg font-semibold">{formatTimeWithAMPM(selectedEvent.time)}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="text-lg font-semibold">
                  {selectedEvent.date.toLocaleDateString('default', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              {selectedEvent.description && (
                <div>
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="text-base">{selectedEvent.description}</p>
                </div>
              )}
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
              <button
                onClick={handleDeleteEvent}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
