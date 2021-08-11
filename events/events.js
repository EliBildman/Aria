const listeners = [];


const on = (event, callback) => {

    const listener = {
        event,
        callback,
        cancel: () => {
            listeners.splice( listeners.indexOf(this) );
        },
    }

    listeners.push(listener);
    return listener;

};


const run = async (event, payload) => {

    console.log(`[Events]: Triggered: ${event}`);

    const on_event = listeners.filter(listener => listener.event === event);

    for( listener of on_event ) {
        listener.callback(payload);
    }

};


module.exports = {
    on,
    run,
}