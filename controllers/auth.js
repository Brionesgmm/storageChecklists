const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const Facility = require("../models/Facility"); // import Facility model at the top of your file
const FacilityInfoSheet = require("../models/FacilityInfoSheet");
const mongoose = require("mongoose");

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
  const { signupCode } = req.body;
  if (signupCode !== process.env.SIGNUP_CODE) {
    validationErrors.push({ msg: "Invalid sign-up code." });
  }

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
exports.updateEmployee = async (req, res) => {
  try {
    const updatedData = {
      userName: req.body.name,
      isAdmin: req.body.isAdmin,
      property: req.body.facilityId,
    };

    const oldUser = await User.findById(req.params.id);

    if (!oldUser) {
      return res.status(404).json({ error: "User not found" });
    }

    let oldFacilityId = oldUser.property;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );

    let oldFacility, newFacility;

    if (
      oldFacilityId &&
      mongoose.Types.ObjectId.isValid(oldFacilityId) &&
      oldFacilityId.toString() !== updatedData.property
    ) {
      await Facility.updateOne(
        { _id: oldFacilityId },
        { $pull: { employees: req.params.id } }
      );
      oldFacility = await Facility.findById(oldFacilityId);
    }

    if (
      updatedData.property &&
      mongoose.Types.ObjectId.isValid(updatedData.property)
    ) {
      // Fetch the Facility
      let facilityToUpdate = await Facility.findById(updatedData.property);
      if (facilityToUpdate) {
        // Check if the user is already in the employees array
        if (!facilityToUpdate.employees.includes(req.params.id)) {
          // If not, add them
          await Facility.updateOne(
            { _id: updatedData.property },
            { $push: { employees: req.params.id } }
          );
        }
      }
      newFacility = await Facility.findById(updatedData.property);
    }

    if (updatedUser) {
      res.json({
        updatedUser,
        facilities: [oldFacility, newFacility].filter(Boolean), // To exclude null if any
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }

    console.log("User updated");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employeeToDelete = await User.findById(req.params.id);

    if (!employeeToDelete) {
      return res.status(404).json({ error: "User not found" });
    }

    let facilityId = employeeToDelete.property;

    if (facilityId && mongoose.Types.ObjectId.isValid(facilityId)) {
      await Facility.updateOne(
        { _id: facilityId },
        { $pull: { employees: req.params.id } }
      );
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ error: "Failed to delete user" });
    }

    // Optionally, you can return the facility that the user was deleted from
    const facility = await Facility.findById(facilityId);

    res.json({ message: "User deleted", facility });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
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
    res.json(facility);
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
      givenCash: req.body.givenCash,
    };
    console.log(req.body.givenCash);
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

exports.getFacilityInfoSheet = async (req, res) => {
  try {
    const facilityInfoSheet = await FacilityInfoSheet.findOne({
      facilityId: req.params.id,
    });

    if (facilityInfoSheet) {
      res.json(facilityInfoSheet);
    } else {
      res.status(404).json({ error: "FacilityInfoSheet not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

exports.updatefacilityinfosheet = async (req, res) => {
  try {
    const updatedData = {
      contacts: req.body.contacts,
      utilityVendors: req.body.utilityVendors,
      siteSystems: req.body.siteSystems,
    };
    console.log(updatedData);
    const updatedFacilityInfoSheet = await FacilityInfoSheet.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );

    if (updatedFacilityInfoSheet) {
      res.json(updatedFacilityInfoSheet);
    } else {
      res.status(404).json({ error: "Facility info sheet not found" });
    }
    console.log("Facility info sheet updated");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
