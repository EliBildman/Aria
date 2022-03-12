const events = require('../events/events');

const Run = {
    name: "Run",
    param: {
        "event": "*string"
    },
    run: (payload, param) => {
        events.run(param.event, payload);
        return payload;
    },
}

module.exports = {
    name: 'Events',
    initialize,
    events: [],
    actions: [
        Run
    ],
}