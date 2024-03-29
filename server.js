const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const taskRoutes = require("./routes/tasks");
const auctionRoutes = require("./routes/auctions");
const cors = require("cors");

app.use(cors());

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Static Folder
app.use(express.static("frontend/dist"));

// app.use((req, res, next) => {
//   // If the path starts with /api, remove the /api prefix
//   if (req.path.startsWith("/api")) {
//     req.url = req.url.replace("/api", "");
//   }
//   next();
// });

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/api", mainRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/auctions", auctionRoutes);
app.use("*", (_, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
});

// Schedule the cron jobs
require("./utility/scheduledTasks");

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
