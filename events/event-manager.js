const fs = require('fs');
const events = require('./events');
const routine_manager = require('./routine-manager');

const events_path = 'configs/events.json';
const trigger_folder = 'events/triggers'
const trigger_folder_rel = 'triggers'

const register_event = (event) => {

    for(routine of event.routines) {
        const runner = routine_manager.get_routine_runner(routine.ID);
        events.on(event.name, runner);
    }

}

const initialize_events = () => {

    events.clear_all();

    const saved_events = JSON.parse( fs.readFileSync(events_path) );

    for(_event of saved_events) {    
        register_event(_event);
    }

    fs.readdirSync(trigger_folder).forEach(cont => {
        if(cont.includes('.js')) {
            require('./' + trigger_folder_rel + '/' + cont).register();
        }
    });

};


module.exports = {
    initialize_events,
    register_event,
}