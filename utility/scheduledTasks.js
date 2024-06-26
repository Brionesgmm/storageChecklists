const mongoose = require("mongoose");
const Task = require("../models/Task");
const Facility = require("../models/Facility");

// Connect to the database (make sure to replace 'your_mongodb_connection_string' with your actual connection string)
mongoose
  .connect(
    "mongodb+srv://jbrionesgmm:Brucelee7!S@cluster0.9uivcrz.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

async function createTasks() {
  console.log("Attempting to create tasks...");

  try {
    // Get all facilities
    const facilities = await Facility.find();
    console.log(`Found ${facilities.length} facilities`);

    // Create a new Task for each facility
    for (let facility of facilities) {
      const newTask = new Task({
        facilityId: facility._id.toString(), // Convert ObjectId to string
        // Initialization of other fields as needed
        notes: {
          overlock: Array(15).fill(""),
          reverseOverlock: Array(15).fill(""),
          clean: Array(15).fill(""),
          toDoList: Array(15).fill(""),
          otherNotes: Array(15).fill(""),
        },
        // other fields...
      });

      // Save the new task
      await newTask.save();
      console.log(`Task created for facility ID: ${facility._id}`);
    }

    console.log("Tasks created for all facilities");
  } catch (err) {
    console.error("An error occurred while creating tasks: ", err);
  } finally {
    // Disconnect from MongoDB after the operation completes
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
}

// Call the function to run it immediately
createTasks();
