const express = require("express");
const Router = require("./routes/route");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv/config");

app.use(cors());
app.use(express.json());
const dbUrl = process.env.DATABASE_URL;

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Data base connected");
  })
  .catch((e) => {
    console.log(e);
  });

// CRUD API
app.use("/", Router);

const PORT = 4545;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
