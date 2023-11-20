const winston = require("winston");

// Create a Winston logger
const winstonLogger = winston.createLogger({
  level: "debug",
  transports: [new winston.transports.Console()],
});

// Export the logger directly
module.exports = winstonLogger;
