import Sequelize from "sequelize";
import db from "../repositories/db.js";

const Calendar = db.define("calendars", {
  calendarId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, { underscored: true })

export default Calendar;