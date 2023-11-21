const express = require("express");
const router = express.Router();
const { createProperty } = require("../controllers/propertyController");
const {isLoggedIn} = require("../middlewares/isLoggedIn");

router.route("/property").post(isLoggedIn, createProperty);

module.exports = router;