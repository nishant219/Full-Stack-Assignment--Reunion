const Property = require("../models/propertyModel");
const User = require("../models/userModel");
const winstonlogger = require("../utils/winston");
const schemaValidator = require("../helper/schemaValidator");
const BigPromise = require("../middlewares/bigPromise");



exports.createProperty = BigPromise(async (req, res, next) => {
    winstonlogger.info("createProperty controller called...");
  
    const { name, description, price, address } = req.body;
    const owner = req.user._id;
  
    if (!owner) {
      winstonlogger.error("User not found");
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  
    if (!name || !description || !price || !address) {
      winstonlogger.error("Name, description, price, and address are required");
      return res.status(400).json({
        success: false,
        message: "Name, description, price, and address are required",
      });
    }
  
    try {
      const property = await Property.create({
        name,
        description,
        price,
        address,
        owner,
      });
  
      res.status(201).json({
        status: "success",
        data: property,
      });
    } catch (error) {
      winstonlogger.error("Error creating property:", error);
      return res.status(500).json({
        success: false,
        message: "Property not created",
      });
    }
  });