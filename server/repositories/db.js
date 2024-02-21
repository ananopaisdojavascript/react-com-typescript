import  Sequelize  from "sequelize";

const sequelize = new Sequelize(
  "postgres://vjvkkdgi:LVk1c6QVjVEbyZljZOIDTPXYyXIz7qKH@stampy.db.elephantsql.com/vjvkkdgi",
  {
    dialect: "postgres",
    define: {
      timestamps: false
    }
  }
)

export default sequelize;