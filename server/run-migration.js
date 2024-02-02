const { sequelize } = require("./sequelize.js");
const { uploadData } = require("./migrations/db-migration");

async function runMigration() {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );

    await uploadData();
  } catch (error) {
    console.error("Error running migration:", error);
  } finally {
    await sequelize.close();
  }
}

module.exports = { runMigration };
