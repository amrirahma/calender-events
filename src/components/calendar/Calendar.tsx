import React from "react";
import { Event as EventType } from "../../constants";
import { calculatePositionAndSize, adjustOverlappingEvents } from "../../utils";
import "../../styles.css";

interface EventProps {
  event: EventType & { width: number; left: number };
}

const Event: React.FC<EventProps> = ({ event }) => {
  const { top, height } = calculatePositionAndSize(event.start, event.duration);
  const style = {
    top: `${top}%`,
    height: `${height}%`,
    width: `${event.width}%`,
    left: `${event.left}%`,
    fontSize: 10,
  };

  return (
    <div className="event" style={style}>
      {event.id}
    </div>
  );
};

interface CalendarProps {
  events: EventType[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const adjustedEvents = adjustOverlappingEvents(events);

  return (
    <div className="calendar">
      {adjustedEvents.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
};

export default Calendar;
