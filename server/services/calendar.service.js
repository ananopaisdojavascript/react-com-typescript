import CalendarRepository from "../repositories/calendar.repository.js";

const createCalendar = async (calendar) => {
  return await CalendarRepository.insertCalendar(calendar)
}

const getCalendars = async () => {
  return await CalendarRepository.getCalendars()
}

const getCalendar = async (id) => {
  return await CalendarRepository.getCalendar(id)
}

export default {
  createCalendar,
  getCalendars,
  getCalendar
}