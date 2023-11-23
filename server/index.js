const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
dotenv.config();

//DB config
const DBConnection = require("./config/DBConnection");

//all routes
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

const app = express();
const port = process.env.PORT || 5000;

//DB connection
DBConnection();

//middlewares
app.use(
  cors({
    origin: ["http://localhost:3000", 'https://client-reunion.vercel.app', "https://backend-reunion.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(express.json()); // Body parser, reading data from body into req.body
app.use(morgan("tiny"));
app.use(helmet());
app.use(xss());

// // Trust the first proxy in front of the app
// app.set('trust proxy', 1);

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   keyGenerator: function (req) {
//     // Use X-Real-IP header for rate limiting if present
//     return req.headers['x-real-ip'] || req.ip;
//   },
// });

// Define API routes
app.use("/api/", userRoutes);
app.use("/api/", propertyRoutes);

// 404 handler
app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
