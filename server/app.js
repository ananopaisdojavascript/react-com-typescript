import express from "express";
import cors from "cors";
import winston from "winston";
import CalendarRouter from "./routes/calendar.route.js";
import EventRouter from "./routes/event.route.js";

const app = express();

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} - ${message}`
});

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new (winston.transports.Console)(), new (winston.transports.File)({ filename: "agenda-api.log" })
  ],
  format: combine(
    label({ label: "agenda-api" }),
    timestamp(),
    myFormat
  )
});

app.use(express.json())
app.use(cors())

app.use("/calendar", CalendarRouter)
app.use("/event", EventRouter)

app.use((error, request, response, _next) => {
  logger.error(`${request.method} ${request.baseUrl} - ${error.message}`);
  response.status(400).send({ error: error.message })
});

export default app;