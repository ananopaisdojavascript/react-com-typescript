import EventRepository from "../repositories/event.repository.js";
import CalendarRepository from "../repositories/calendar.repository.js";

const errorMessage = "O id informado não existe"

const createEvent = async (event) => {
  if (await CalendarRepository.getCalendar(event.calendarId)) {
    return await EventRepository.insertEvent(event)
  }
  throw new Error("Esse id não existe")
}

const getEvents = async (calendarId) => {
  if (calendarId) {
    return await EventRepository.getEventsByCalendarId(calendarId)
  }
  return await EventRepository.getEvents()
}

const getEvent = async (id) => {
  return await EventRepository.getEvent(id)
}

const updateEvent = async (event) => {
  if (!await CalendarRepository.getCalendar(event.calendarId)) {
    throw new Error(errorMessage)
  }
  return await EventRepository.updateEvent(event)
}

const deleteEvent = async (id) => {
  await EventRepository.deleteEvent(id)
}

export default {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent
}