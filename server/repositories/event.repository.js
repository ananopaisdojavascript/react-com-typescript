import Calendar from "../models/calendar.model.js";
import Event from "../models/event.model.js";

const insertEvent = async (event) => {
  try {
    return await Event.create(event)
  } catch (error) {
    throw error
  }
}

const getEvents = async () => {
  try {
    return await Event.findAll({
      include: {
        model: Calendar
      }
    })
  } catch (error) {
    throw error
  }
}

const getEventsByCalendarId = async (calendarId) => {
  try {
    return await Event.findAll({
      where: {
        calendarId: calendarId
      }
    })
  } catch (error) {
    throw error
  }
}

const getEvent = async (id) => {
  try {
    return await Event.findByPk(id, {
      include: {
        model: Calendar
      }
    })
  } catch (error) {
    throw error
  }
}

const updateEvent = async (event) => {
  try {
    await Event.update(
      {
        date: event.date,
        time: event.time,
        description: event.description,
        calendarId: event.calendarId
      },
      {
        where: {
          eventId: event.eventId
        }
      }
    )
    return await getEvent(event.eventId)
  } catch (error) {
    throw error
  }
}

const deleteEvent = async (id) => {
  try {
    await Event.destroy({
      where: {
        eventId: id
      }
    })
  } catch (error) {
    throw error
  }
}

export default {
  insertEvent,
  getEvents,
  getEventsByCalendarId,
  getEvent,
  updateEvent,
  deleteEvent
}