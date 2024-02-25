import httpService from "./httpService";

const getCalendars = async () => {
  const calendars = await httpService.read("/calendar")
  return calendars
}

const getEvents = async (startDate: string, endDate: string) => {
  const events = await httpService.read(`/event?date_gte=${startDate}&date_lte=${endDate}&_sort=date,time`)
  return events
}

export default {
  getCalendars,
  getEvents
}