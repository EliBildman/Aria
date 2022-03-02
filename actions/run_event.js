const events = require('../events/events');

module.exports.param = {
    "event": "*string"
}

module.exports.run = (payload, param) => {
    events.run(param.event, payload);
    return payload;
};
