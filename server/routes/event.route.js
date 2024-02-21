import express from "express"
import EventController from "../controllers/event.controller.js";

const router = express.Router()

router.post("/", EventController.createEvent)
router.get("/", EventController.getEvents)
router.get("/:id", EventController.getEvent)
router.put("/", EventController.updateEvent)
router.delete("/:id", EventController.deleteEvent)

export default router;