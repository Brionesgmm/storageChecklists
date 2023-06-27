function checkApiKey(req, res, next) {
  const apiKey = req.get("X-API-KEY");
  if (!apiKey || apiKey !== process.env.API_SECRET) {
    return res.status(401).send("Unauthorized");
  }
  next();
}

module.exports = checkApiKey;
