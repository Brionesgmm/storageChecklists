require("dotenv").config();

console.log(process.env.DB_STRING); // This should print your MongoDB connection string

const mongoose = require("mongoose");
const Facility = require("../models/Facility");

mongoose.connect(process.env.DB_STRING, {
  // replace with your MongoDB connection string
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const facilities = [
  { name: "Facility 1", address: "123 Main St", employees: [] },
  { name: "Facility 2", address: "456 Maple Ave", employees: [] },
  // add more facilities as needed
];

Facility.insertMany(facilities)
  .then(() => console.log("Facilities inserted successfully!"))
  .catch((err) => console.error(err))
  .finally(() => mongoose.connection.close());
