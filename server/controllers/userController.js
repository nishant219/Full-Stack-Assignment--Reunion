const User = require("../models/userModel");
const BigPromise = require("../middlewares/bigPromise");
const cookieToken = require("../utils/cookieToken");
const crypto = require("crypto");
const winstonLogger = require("../utils/winston");

//exports.NameOfController =BigPromise(async(err,req,res,next)=>{})
 

//signup controller
exports.signup = BigPromise(async (req, res, next) => {
    winstonLogger.info("Signup controller called");

    const { name, email, password } = req.body;
    
    if ( !name || !email || !password) {
        winstonLogger.error("Name, email and password are required");
        return res.status(400).json({
            success: false,
            message: "Name, email and password are required",
        });
    }
    //create User object = user in database based on model schema
    const user = await User.create({
        name,
        email,
        password
    });
    //as user successfully signup on web we are sending cookieToken 
    cookieToken(user, res);
});



//login route
exports.login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    winstonLogger.error("Email and password are required");
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
}
  //as we have designed schema select:false we have to provide +password explicitely
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    winstonLogger.error("You are not registered in the db");
    return res.status(400).json({
      success: false,
      message: "You are not registered in the db",
    });
  }

  //if user present then validate password  //with the help of methods in models
  const isPasswordCorrect = await user.isValidatedPassword(password);

  if (!isPasswordCorrect) {
        winstonLogger.error("Email or password does not match or exist");
        return res.status(400).json({
          success: false,
          message: "Email or password does not match or exist",
        });
  }
  //now everything is fine, so we can send the token
  cookieToken(user, res);
});



//logout -> we are deleting tokens manually  //jwt tokens are stateless, 
exports.logout = BigPromise(async (req, res, next) => {
  //you have value 'token' make it null and set expirary now
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout success",
  });
});


