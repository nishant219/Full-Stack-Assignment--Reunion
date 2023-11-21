const mongoose = require("mongoose");
const User = require("./userModel");

const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"], //if true : err msg
        maxlength: [40, "Name should be under 40 character"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
        maxlength: [200, "Description should be under 200 character"],
    },
    price: {
        type: Number,
        required: [true, "Please provide a price"],
    },
    address: {
        type: String,
        required: [true, "Please provide a address"],
    },
    owner : {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Please provide a owner"],
    },
    isAvailable: {
        type: Boolean,
        default: true,
        required: [true, "Please provide availability status"],
    },
    typeOfProperty: {
        type: String,
        enum: ["house", "apartment", "townhouse", "land", "commercial", "other"],
        required: [true, "Please provide a type of property"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
    }); 

module.exports = mongoose.model("Property", propertySchema);