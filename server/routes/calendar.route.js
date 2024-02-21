import express from "express";
import CalendarController from "../controllers/calendar.controller.js";

const router = express.Router()

router.post("/", CalendarController.createCalendar)
router.get("/", CalendarController.getCalendars)
router.get("/:id", CalendarController.getCalendar)

export default router;