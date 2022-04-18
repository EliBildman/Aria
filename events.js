const fs = require('fs');
const event_manager = require('./managers/event-manager');
const { SystemLogger } = require('./loggers');

const events_path = 'data/configs/events.json';

let listeners = [];

const on = (event, callback) => {
    const listener = {
        event,
        callback,
    };

    listener.cancel = () => {
        listeners.splice(listeners.indexOf(listener), 1);
    };

    listeners.push(listener);

    return listener;
};

const run = async (event, payload) => {
    SystemLogger.info(`Fired Event: "${event}"`);
    const saved_events = JSON.parse(fs.readFileSync(events_path)); //check if doesnt exist yet
    if (!saved_events.some((ev) => ev.name == event)) {
        event_manager.create_event({
            name: event,
            routines: [],
        });
    }

    const on_event = listeners.filter((listener) => listener.event === event);

    for (listener of on_event) {
        listener.callback(payload);
    }
};

// const clear_all = () => {
//     listeners = [];
// }

module.exports = {
    on,
    run,
};
