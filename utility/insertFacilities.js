require("dotenv").config({ path: __dirname + "/../config/.env" });
const mongoose = require("mongoose");
const Facility = require("../models/Facility");
const connectDB = require("../config/database"); // import the connectDB function

connectDB(); // call the function to connect to the database

const facilities = [
  { name: "Facility 1", address: "123 Main St", employees: [] },
  { name: "Facility 2", address: "456 Maple Ave", employees: [] },
  // add more facilities as needed
];

Facility.insertMany(facilities)
  .then(() => console.log("Facilities inserted successfully!"))
  .catch((err) => console.error(err))
  .finally(() => mongoose.connection.close());
