import { IEvent } from "./models/event";
import { ICalendar } from "./models/calendar";

export  type CalendarAndEvents = IEvent & { calendar: ICalendar }

export interface ICalendarCell {
  date: string;
  dayOfMonth: number;
  events: CalendarAndEvents[];
}