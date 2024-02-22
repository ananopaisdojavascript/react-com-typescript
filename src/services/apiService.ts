import httpService from "./httpService";

const getCalendars = async () => {
  const calendars = await httpService.read("/calendar")
  return calendars
}

const getEvents = async () => {
  const events = await httpService.read("/event")
  return events
}

export default {
  getCalendars,
  getEvents
}