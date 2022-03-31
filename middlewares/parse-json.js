module.exports = (req, res, next) => {
  if (req.is("application/json") || req.is("json")) {
    console.log("body: ", req.body);
  }

  next();
};
