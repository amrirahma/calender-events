import {Event} from "../constants";

interface AdjustedEvent extends Event {
    width: number;
    left: number;
}

export const adjustOverlappingEvents = (events: Event[]): AdjustedEvent[] => {
    // Sort events by start time
    const sortedEvents = [...events].sort((a, b) => {
        const startA = parseInt(a.start.replace(":", ""), 10);
        const startB = parseInt(b.start.replace(":", ""), 10);
        return startA - startB;
    });

    const adjustedEvents: AdjustedEvent[] = [];

    for (let i = 0; i < sortedEvents.length; i++) {
        const event = sortedEvents[i];
        const overlappingEvents: Event[] = [event];

        // Find all overlapping events
        for (let j = i + 1; j < sortedEvents.length; j++) {
            const nextEvent = sortedEvents[j];
            const eventEnd =
                parseInt(event.start.replace(":", ""), 10) + event.duration;
            const nextEventStart = parseInt(nextEvent.start.replace(":", ""), 10);
            if (nextEventStart < eventEnd) {
                overlappingEvents.push(nextEvent);
                i++;
            } else {
                break;
            }
        }

        const width = 100 / overlappingEvents.length;

        overlappingEvents.forEach((event, index) => {
            adjustedEvents.push({...event, width, left: width * index});
        });
    }

    return adjustedEvents;
};
export const calculatePositionAndSize = (start: string, duration: number) => {
    const startHour = 9;
    const endHour = 21;
    const totalMinutes = (endHour - startHour) * 60;
    const startMinutes =
        parseInt(start.split(":")[0], 10) * 60 +
        parseInt(start.split(":")[1], 10) -
        startHour * 60;

    const top = (startMinutes / totalMinutes) * 100;
    const height = (duration / totalMinutes) * 100;

    return {top, height};
};
