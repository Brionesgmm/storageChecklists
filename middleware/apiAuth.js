// function checkApiKey(req, res, next) {
//   const cyclic = req.get("x-cyclic");
//   if (cyclic !== "cron") {
//     return res.status(401).send("Unauthorized");
//   }
//   next();
// }

// module.exports = checkApiKey;

function checkApiKey(req, res, next) {
  // You can check for a header or a query parameter, depending on your preference
  const token = req.get("Authorization") || req.query.token;

  if (token !== process.env.CRON_SECRET_TOKEN) {
    return res.status(401).send("Unauthorized");
  }
  next();
}

module.exports = checkApiKey;
