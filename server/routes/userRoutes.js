const express = require("express");
const router = express.Router();
const { isLoggedIn, customRole } = require("../middlewares/isLoggedIn");


const {
  signup,
  login,
  logout
} = require("../controllers/userController");



//router.route().method(functionality that route going to perform)

router.route("/signup").post(signup);  
router.route("/login").post(login);
router.route("/logout").get(logout);
 

module.exports = router;

