const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

// Gloabal middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Route Imports
const rootRoute = require("./routes/rootRoute");

app.use("/api/v1", rootRoute);

// Middleware for error
// app.use(errorMiddleware);

module.exports = app;
