import Calendar from "../models/calendar.model.js";

const insertCalendar = async (calendar) => {
  try {
    return await Calendar.create(calendar)
  } catch (error) {
    throw error
  }
}

const getCalendars = async () => {
  try {
    return await Calendar.findAll()
  } catch (error) {
    throw error
  }
}

const getCalendar = async (id) => {
  try {
    return await Calendar.findByPk(id)
  } catch (error) {
    throw error
  }
}

export default {
  insertCalendar,
  getCalendars,
  getCalendar
}