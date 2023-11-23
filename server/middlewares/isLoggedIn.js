const User = require("../models/userModel");
const BigPromise = require("../middlewares/bigPromise");
const jwt = require("jsonwebtoken");
const winstonLogger = require("../utils/winston");

exports.isLoggedIn = BigPromise(async (req, res, next) => {
  try {

    //let token = req.cookies || (req.headers.authorization && req.headers.authorization.replace("Bearer ", ""));
    let token = req.cookies.token || (req.headers.authorization && req.headers.authorization.replace("Bearer ", ""));
    
    if (!token) {
      winstonLogger.error("Token not present");
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token not present",
      });
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Inject the user into the req object (req body)
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      winstonLogger.error("User not found in the database");
      return res.status(401).json({
        success: false,
        message: "User not found in the database",
      });
    }
    winstonLogger.info("Token decoded successfully");
    next();
  } catch (error) {
    console.error("Error decoding token:", error);
    winstonLogger.error("Error decoding token:", error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
});
