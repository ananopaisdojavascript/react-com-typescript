import EventService from "../services/event.service.js";

const createEvent = async (request, response, next) => {
  try {
    let event = request.body
    const wereTheFieldsInformed = !event.date || !event.time || !event.description || !event.calendarId
    if (wereTheFieldsInformed) {
      throw new Error("O preenchimento dos campos de data, hora, descrição e id do calendário é obrigatório.")
    }
    event = await EventService.createEvent(event)
    response.send(event)
    logger.info(`POST /event - ${JSON.stringify(event)}`)
  } catch (error) {
    next(error)
  }
}

const getEvents = async (request, response, next) => {
  try {
    response.send(await EventService.getEvents(request.query.calendarId))
    logger.info(`GET /event`)
  } catch (error) {
    next(error)
  }
}

const getEvent = async (request, response, next) => {
  try {
    response.send(await EventService.getEvent(request.params.id))
    logger.info(`GET /event`)
  } catch (error) {
    next(error)
  }
}

const updateEvent = async (request, response, next) => {
  try {
    let event = request.body
    const wereTheFieldsInformed = !event.eventId || !event.date || !event.time || !event.description || !event.calendarId
    if (wereTheFieldsInformed) {
      throw new Error("O preenchimento dos campos de id do evento, data, hora, descrição e id do calendário é obrigatório.")
    }
    event = await EventService.updateEvent(event)
    response.send(event)
    logger.info(`PUT /event - ${JSON.stringify(event)}`)
  } catch (error) {
    next(error)
  }
}

const deleteEvent = async (request, response, next) => {
  try {
    await EventService.deleteEvent(request.params.id)
    response.end()
    logger.info(`DELETE /event`)
  } catch (error) {
    next(error)
  }
}

export default {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent
}