const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
let multer = require("multer");
let upload = multer();
const errorMiddleware = require("./middleware/error");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.set("trust proxy", true);

// Gloabal middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(upload.array());

// Route Imports
const rootRoute = require("./routes/rootRoute");

app.use("/api/v1", rootRoute);

// Middleware for error
app.use(errorMiddleware);

module.exports = app;
