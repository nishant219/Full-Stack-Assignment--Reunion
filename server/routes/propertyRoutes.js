const express = require("express");
const router = express.Router();

const { createProperty, getAllProperties, deleteProperty, updateProperty, getPropertiesByOwner, searchAndSortProperties  } = require("../controllers/propertyController");

const {isLoggedIn} = require("../middlewares/isLoggedIn");

router.route("/property").post(isLoggedIn, createProperty);
router.route("/list-properties").get( getAllProperties);
router.route("/delete-property/:id").delete(isLoggedIn, deleteProperty);
router.route("/property/:id").put(isLoggedIn, updateProperty);
router.route("/property").get(isLoggedIn, getPropertiesByOwner);
router.route("/search-properties").get(searchAndSortProperties);


module.exports = router;