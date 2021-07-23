const events = require('../events/events');

module.exports = (req, res, next) => {

    const event = `${req.method} ${req.url}`;
    const payload = req.body;

    events.run(event, payload);

    next();

};