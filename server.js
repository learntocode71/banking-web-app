const express = require("express");
require("express-async-errors");
require("dotenv").config();
const cors = require("cors");
require("./config/passport");
const bodyParser = require("body-parser");

const connectDB = require("./config/connectDB");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");
const clientRoutes = require("./routes/clientRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(bodyParser({ limit: "5mb" }));
app.use(express.json());

// routes
app.use("/api/v1/client", clientRoutes);
app.use("/api/v1/auth", authRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
  }
};

start();
