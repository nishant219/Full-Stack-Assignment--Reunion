const User =require("../models/userModel");
const BigPromise = require("../middlewares/bigPromise")
const jwt= require("jsonwebtoken");
const winstonLogger = require("../utils/winston");


exports.isLoggedIn = BigPromise(async (req, res, next) => {
  req.user = null; //to avoid undefined error
  
  const token =
    req.cookies.token || (req.headers.authorization && req.headers.authorization.replace("Bearer ", ""));

 
  if (!token) {
    winstonLogger.error("User not authenticated");
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    });
  }

  // Decode token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Inject user in our req object (req body)
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      winstonLogger.error("User not found in the database");
      return res.status(401).json({
        success: false,
        message: "User not found in the database",
      });
    }

    next();
  } catch (error) {
    winstonLogger.error("Error decoding token:", error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token",
    });
  }
});



//to decide role //admin or user  ////roles=array =='manager'
exports.customRole=(...roles)=>{ 
   return(req,res,next)=>{
       if(!roles.includes(req.user.role)){
            return winstonLogger.error("You are not allowed for this resources");
       }
       next();
   }

};