const fs = require('fs');

const events_path = 'configs/events.json';
let perm_listeners = []; //not reset from api
let listeners = [];

const on = (event, callback, is_perm = false) => {

    const listener = {
        event,
        callback,
        cancel: () => {
            listeners.splice( listeners.indexOf(this) );
        },
    }

    if(is_perm) {
        perm_listeners.push(listener);
    } else {
        listeners.push(listener);
    }

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
            routines: []
        };

        saved_events.push(new_event);
        fs.writeFileSync(events_path, JSON.stringify(saved_events) );

    }

    const on_event = listeners.concat(perm_listeners).filter(listener => listener.event === event)

    for( listener of on_event ) {
        listener.callback(payload);
    }

};

const clear_all = () => {
    listeners = [];
}


module.exports = {
    on,
    run,
    clear_all,
}