const PRINT_LOGS = true;

module.exports = (req, res, next) => {
  const baseURL = "http://" + req.headers.host + "/";
  const url = new URL(req.url, baseURL);

  if (PRINT_LOGS) console.log(`[HTTP]: ${req.method} ${url.pathname}`);

  next();
};
