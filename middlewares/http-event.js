const events = require("../events/events");
// const url = require('url');

module.exports = (req, res, next) => {
  const baseURL = "http://" + req.headers.host + "/";
  const url = new URL(req.url, baseURL);

  const event = `${req.method} ${url.pathname}`;
  const payload = {
    body: req.body,
    query: url.searchParams,
  };

  events.run(event, payload);

  next();
};
