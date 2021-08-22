const listeners = [];

const events_path = 'configs/events.json';

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

    const saved_events = JSON.parse( fs.readFileSync(events_path) ); //check if doesnt exist yet
    if(!saved_events.some(ev => ev.name == event)) {
        
        let ID = 0;
        while(saved_events.some(ev => ev.ID == ID)) ID++; //should put all of this in event_manager eventually
        
        const new_event = {
            ID,
            name: event,
            routines = []
        }

    }

    const on_event = listeners.filter(listener => listener.event === event);

    for( listener of on_event ) {
        listener.callback(payload);
    }

};


module.exports = {
    on,
    run,
}