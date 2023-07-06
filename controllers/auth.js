const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const Facility = require("../models/Facility"); // import Facility model at the top of your file

exports.getUser = (req, res) => {
  res.json({ user: req.user || null });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.json({ messages: req.flash() });
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.json({ messages: req.flash() });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.json({ user, messages: req.flash() });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log("User has logged out.");
  });
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.json({ messages: req.flash() });
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    property: req.body.property,
    isAdmin: false,
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    async (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.json({ messages: req.flash() });
      }
      user.save(async (err) => {
        if (err) {
          return next(err);
        }
        const facility = await Facility.findById(req.body.property);
        if (!facility) {
          req.flash("errors", {
            msg: "The selected facility does not exist.",
          });
          return res.json({ messages: req.flash() });
        }
        facility.employees.push(user._id);
        await facility.save();
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.json({ user, messages: req.flash() });
        });
      });
    }
  );
};

exports.getFormUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.getFacilities = async (req, res, next) => {
  try {
    const facilities = await Facility.find();
    res.json(facilities);
  } catch (err) {
    next(err);
  }
};

exports.getFacilityName = async (req, res, next) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: "Facility not found" });
    }
    res.json({ name: facility.name });
  } catch (err) {
    next(err);
  }
};

exports.createFacility = async (req, res) => {
  try {
    const facility = await Facility.create({
      name: req.body.name,
      address: req.body.address,
      employees: req.body.employees,
    });
    console.log("Facility has been added!");
    res.json({ facility });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteFacility = async (req, res) => {
  try {
    await Facility.deleteOne({ _id: req.params.id });
    console.log("Deleted Facility");
    res.json({ message: "Facility deleted successfully" });
    // res.redirect("/profile");
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the facility" });
  }
};

exports.updateFacility = async (req, res) => {
  try {
    const updatedData = {
      name: req.body.name,
      address: req.body.address,
    };

    const updatedFacility = await Facility.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );

    if (updatedFacility) {
      res.json(updatedFacility);
    } else {
      res.status(404).json({ error: "Facility not found" });
    }
    console.log("Facility updated");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
