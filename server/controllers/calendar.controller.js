import CalendarService from "../services/calendar.service.js";

const createCalendar = async(request, response, next) => {
  try {
    let calendar = request.body;
    const wereTheFieldsInformed = !calendar.name || !calendar.color
    if (wereTheFieldsInformed) {
      throw new Error("O preenchimento dos campos de nome e cor é obrigatório.")
    }
    calendar = await CalendarService.createCalendar(calendar)
    response.send(calendar)
    logger.info(`POST /calendar - ${JSON.stringify(calendar)}`)
  } catch (error) {
    next(error)
  }
}

const getCalendars = async (_request, response, next) => {
  try {
    response.send(await CalendarService.getCalendars())
    logger.info("GET /calendar")
  } catch (error) {
    next(error)
  }
}

const getCalendar = async (request, response, next) => {
  try {
    response.send(await CalendarService.getCalendar(request.params.id))
    logger.info("GET /calendar")
  } catch (error) {
    next(error)
  }
}

export default {
  createCalendar,
  getCalendars,
  getCalendar
}