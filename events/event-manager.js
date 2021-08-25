const fs = require('fs');
const events = require('./events');
const routine_manager = require('./routine-manager');

const events_path = 'configs/events.json';

const register_event = (event) => {

    for(routine of event.routines) {
        events.on(event.name, routine_manager.get_routine_runner(routine.ID));
    }

}

const initialize_events = () => {

    events.clear_all();
    // console.log('ran')

    const saved_events = JSON.parse( fs.readFileSync(events_path) );

    for(_event of saved_events) {    
        register_event(_event);
    }

};


module.exports = {
    initialize_events,
    register_event,
}