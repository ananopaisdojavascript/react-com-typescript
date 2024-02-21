import Sequelize from "sequelize";
import db from "../repositories/db.js";
import Calendar from "./calendar.model.js";

const Event = db.define("events", {
  eventId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  time: {
    type: Sequelize.TIME,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, { underscored: true })

Event.belongsTo(Calendar, { foreignKey: "calendarId" })

export default Event;