const passport = require("passport");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { name, email, password, facility } = req.body;

  try {
    const user = new User({ name, email, password, facility });
    await user.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
};
