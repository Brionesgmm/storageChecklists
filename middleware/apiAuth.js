function checkApiKey(req, res, next) {
  const cyclic = req.get("x-cyclic");
  if (cyclic !== "cron") {
    return res.status(401).send("Unauthorized");
  }
  next();
}

module.exports = checkApiKey;
