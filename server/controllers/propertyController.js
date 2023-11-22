const Property = require("../models/propertyModel");
const User = require("../models/userModel");
const winstonlogger = require("../utils/winston");
const schemaValidator = require("../helper/schemaValidator");
const BigPromise = require("../middlewares/bigPromise");



exports.createProperty = BigPromise(async (req, res, next) => {
    winstonlogger.info("createProperty controller called...");
  
    const { name, description, price, address, typeOfProperty, isAvailable } = req.body;
    const owner = req.user._id;
  
    if (!owner) {
      winstonlogger.error("User not found");
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  
    if (!name || !description || !price || !address || !typeOfProperty || !isAvailable) {
      winstonlogger.error("Name, description, price, address, type of property and availability status");
      return res.status(400).json({
        success: false,
        message: "Name, description, price, address, type of property and availability status are required",
      });
    }

    const existingProperty = await Property.findOne({ name, address });

      if (existingProperty) {
        winstonlogger.error("Property with the same name and address already exists");
        return res.status(400).json({
          success: false,
          message: "Property with the same name and address already exists",
        });
      }
  
    try {
      const property = await Property.create({
        name,
        description,
        price,
        address,
        owner,
        typeOfProperty,
        isAvailable
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

  

  //fetch all properties
exports.getAllProperties = BigPromise(async (req, res, next) => {
    winstonlogger.info("getAllProperties controller called...");
  
    try {
      const properties = await Property.find();

      if (!properties) {
        winstonlogger.error("Properties not found");
        return res.status(404).json({
          success: false,
          message: "Properties not found",
        });
      }
  
      res.status(200).json({
        status: "success",
        data: properties,
      });
    } catch (error) {
      winstonlogger.error("Error fetching properties:", error);
      return res.status(500).json({
        success: false,
        message: "Properties not found",
      });
    }
  });



  //delete property based on id
exports.deleteProperty = BigPromise(async (req, res, next) => {
    winstonlogger.info("deleteProperty controller called...");
  
    const { id } = req.params;
  
    if (!id) {
      winstonlogger.error("Property ID is required");
      return res.status(400).json({
        success: false,
        message: "Property ID is required",
      });
    }
  
    try {
      const property = await Property.findByIdAndDelete(id);
  
      if (!property) {
        winstonlogger.error("Property not found");
        return res.status(404).json({
          success: false,
          message: "Property not found",
        });
      }
  
      res.status(200).json({
        status: "success",
        data: property,
      });
    } catch (error) {
      winstonlogger.error("Error deleting property:", error);
      return res.status(500).json({
        success: false,
        message: "Property not deleted",
      });
    }
  });



 //update property based on ID
exports.updateProperty = BigPromise(async (req, res, next) => {
    winstonlogger.info("updateProperty controller called...");
  
    const { id } = req.params;
    const { name, description, price, address, isAvailable, typeOfProperty } = req.body;
  
    if (!id) {
      winstonlogger.error("Property ID is required");
      return res.status(400).json({
        success: false,
        message: "Property ID is required",
      });
    }
  
    if (!name || !description || !price || !address || !isAvailable || !typeOfProperty) {
      winstonlogger.error("Name, description, price, status and address are required");
      return res.status(400).json({
        success: false,
        message: "Name, description, price, status and address are required",
      });
    }
  
    try {
      const property = await Property.findByIdAndUpdate(
        id,
        { name, description, price, address, isAvailable, typeOfProperty },
        { new: true }
      );
  
      if (!property) {
        winstonlogger.error("Property not found");
        return res.status(404).json({
          success: false,
          message: "Property not found",
        });
      }
  
      res.status(200).json({
        status: "success",
        data: property,
      });
    } catch (error) {
      winstonlogger.error("Error updating property:", error);
      return res.status(500).json({
        success: false,
        message: "Property not updated",
      });
    }
  });

  

  //fetch properties based on owner ID extracted from token
exports.getPropertiesByOwner = BigPromise(async (req, res, next) => {
    winstonlogger.info("getPropertiesByOwner controller called...");
  
    //const { id } = req.params;
    const ownerIdFromToken = req.user._id;
  
    if (!ownerIdFromToken) {
      winstonlogger.error("Owner ID from token is missing");
      return res.status(400).json({
        success: false,
        message: "Owner ID from token is missing",
      });
    }
  
    try {
      const properties = await Property.find({ owner: ownerIdFromToken });
  
      if (!properties) {
        winstonlogger.error("Properties not found");
        return res.status(404).json({
          success: false,
          message: "Properties not found",
        });
      }
  
      res.status(200).json({
        status: "success",
        data: properties,
      });
    } catch (error) {
      winstonlogger.error("Error fetching properties:", error);
      return res.status(500).json({
        success: false,
        message: "Properties not found",
      });
    }
  });


 //search and sort properties based on query parameters
 exports.searchAndSortProperties = BigPromise(async (req, res, next) => {
  winstonlogger.info("searchAndSortProperties controller called...");

  const { searchTerm, sort } = req.query;

  try {
    let query = Property.find();

    // Sorting logic
    if (sort) {
      const sortBy = sort.split(',').join(' ');
      query = query.sort(sortBy);
    }

    // Searching logic
    if (searchTerm) {
      query = query.find({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },  
          { description: { $regex: searchTerm, $options: 'i' } }, 
          { typeOfProperty: { $regex: searchTerm, $options: 'i' } }, //for case-insensitive search
          { address: { $regex: searchTerm, $options: 'i' } }
        ],
      });
    }

    const properties = await query.exec();

    res.status(200).json({
      status: "success",
      data: properties,
    });
  } catch (error) {
    winstonlogger.error("Error searching and sorting properties:", error);
    return res.status(500).json({
      success: false,
      message: "Error searching and sorting properties",
    });
  }
});


