const User = require("../models/userModel");
const BigPromise = require("../middlewares/bigPromise");
const jwt = require("jsonwebtoken");
const winstonLogger = require("../utils/winston");

exports.isLoggedIn = BigPromise(async (req, res, next) => {
  try {
    // Extract the token
    console.log("Request Headers:", req.headers);
    console.log("Request Cookies:", req.cookies);
    console.log("Request Authorization:", req.headers.authorization);
    console.log("Request Authorization Bearer:", req.headers.authorization.replace("Bearer ", ""));


    //let token = req.cookies || (req.headers.authorization && req.headers.authorization.replace("Bearer ", ""));
    let token = req.cookies.token || (req.headers.authorization && req.headers.authorization.replace("Bearer ", ""));
    
    if (!token) {
      winstonLogger.error("Token not present");
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token not present",
      });
    }

    // Log the received token for debugging
    console.log("Received Token:", token);

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Header:", decoded.header);
    console.log("Decoded Payload:", decoded.payload);
    console.log("Decoded Signature:", decoded.signature);

    // Log the decoded token for debugging
    console.log("Decoded Token:", decoded);

    // Inject the user into the req object (req body)
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      winstonLogger.error("User not found in the database");
      return res.status(401).json({
        success: false,
        message: "User not found in the database",
      });
    }

    // Log that the token is successfully decoded
    winstonLogger.info("Token decoded successfully");

    next();
  } catch (error) {
    // Log the error separately
    console.error("Error decoding token:", error);
    winstonLogger.error("Error decoding token:", error);

    // Handle any decoding error generically
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
});
