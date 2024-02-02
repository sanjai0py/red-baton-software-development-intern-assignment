require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const { protected } = require("./middlewares/authHandler");

const { sequelize } = require("./sequelize");
const { uploadData } = require("./migrations/db-migration");

const authRoute = require("./routes/auth.route");
const dashboardRoute = require("./routes/dashboard.route");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("api/v1/auth", authRoute);
app.use("api/v1/dashboard", protected, dashboardRoute);

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

runMigration().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
