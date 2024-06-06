import Events from "../input.json";

export interface Event {
    id: number;
    start: string;
    duration: number;
}

export const EVENTS: Event[] = Events;
