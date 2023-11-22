const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const cookieParser = require("cookie-parser");


const dotenv = require('dotenv');
dotenv.config();

//DB config
const DBConnection=require("./config/DBConnection");


//all routes
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');


const app = express();
const port = process.env.PORT || 5000;


//DB connection
DBConnection();


//middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'https://backend-reunion.vercel.app'],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(express.json()); // Body parser, reading data from body into req.body
app.use(morgan('tiny'));
app.use(helmet());
app.use(xss());


const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!"
});


// Define API routes 
app.use('/api/', limiter, userRoutes);
app.use('/api/', limiter, propertyRoutes);



// 404 handler
app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
})


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})