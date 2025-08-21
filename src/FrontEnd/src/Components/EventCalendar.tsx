import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Calendar.css';

interface CalendarEvent {
  date: Date;
  title: string;
  description: string;
}

export default function EventCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const events: CalendarEvent[] = [
    {
      date: new Date(year, month, 5),
      title: 'Community Picnic',
      description: 'Bring your family and enjoy a picnic at the central park.'
    },
    {
      date: new Date(year, month, 12),
      title: 'Bible Study',
      description: 'Weekly bible study at the church hall, starting 7pm.'
    },
    {
      date: new Date(year, month, 20),
      title: 'Youth Outreach',
      description: 'A day of outreach with the youth group in the city centre.'
    }
  ];

  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = new Array(startDay).fill(null);
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const eventsForDate = (date: Date) =>
    events.filter((e) => e.date.toDateString() === date.toDateString());

  const handleDayClick = (day: number | null) => {
    if (!day) return;
    const clickedDate = new Date(year, month, day);
    setSelectedDate(clickedDate);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <>
      <table className="calendar">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((weekRow, i) => (
            <tr key={i}>
              {weekRow.map((day, j) => {
                const date = day ? new Date(year, month, day) : null;
                const dayEvents = date ? eventsForDate(date) : [];
                return (
                  <td
                    key={j}
                    className="calendar-cell"
                    onClick={() => handleDayClick(day)}
                  >
                    {day && <div className="day-number">{day}</div>}
                    {dayEvents.length > 0 && <div className="event-dot" />}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Events on {selectedDate?.toDateString()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDate && eventsForDate(selectedDate).length > 0 ? (
            <ul>
              {eventsForDate(selectedDate).map((event, idx) => (
                <li key={idx}>
                  <strong>{event.title}</strong>
                  <p>{event.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No events for this day.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

