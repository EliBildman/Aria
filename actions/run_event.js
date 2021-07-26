const events = require('../events/events');

//{event: str}
module.exports = (payload, param) => {
    events.run(param.event, payload);
    return payload;
};
