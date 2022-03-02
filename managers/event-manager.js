const fs = require('fs');
const events = require('../events/events');
const routine_manager = require('./routine-manager');
const action_manager = require('./action-manager')

const events_path = 'data/configs/events.json';

const system_triggers = 'events/system-triggers'
const trigger_folder_rel = '../events/system-triggers'

let event_listeners = [];

module.exports.register_event = (event) => {

    for (routine of event.routines) {
        const runner = action_manager.get_routine_runner(routine.ID);
        event_listeners.push( events.on(event.name, runner) );
    }

};

module.exports.initialize_events = () => {

    event_listeners.forEach(listener => listener.cancel());
    event_listeners = [];

    const saved_events = this.get_events();

    for (let _event of saved_events) {
        this.register_event(_event);
    }

};

module.exports.prune_routine = (routine_ID) => {

    const saved_events = this.get_events();

    for(let _event of saved_events) {

        const new_routines = [];
        for(routine of _event.routines) {
            if(routine.ID != routine_ID) new_routines.push(routine);
        }

        _event.routines = new_routines;

    }

    save_events(saved_events)

}

module.exports.get_events = () => {
    return JSON.parse(fs.readFileSync(events_path));
}

const save_events = (events) => {
    fs.writeFileSync(events_path, JSON.stringify(events));
    this.initialize_events();
}

module.exports.create_event = (new_event) => {

    const saved_events = this.get_events();
    new_event.ID = Date.now();
    saved_events.push(new_event);

    save_events(saved_events);

}

module.exports.update_event = (ID, updated_event) => {

    const saved_events = this.get_events();

    updated_event.ID = ID;
    const old_event_ind = saved_events.findIndex(ev => ev.ID == ID);
    saved_events[old_event_ind] = updated_event;

    save_events(saved_events);

}

module.exports.delete_event = (ID) => {

    const saved_events = this.get_events();

    const del_ind = saved_events.findIndex(ev => ev.ID == ID);
    saved_events.splice(del_ind, 1);

    save_events(saved_events);

}

module.exports.run_event = (ID) => {

    const saved_events = this.get_events();

    const name = saved_events.find(e => e.ID == ID).name;
    events.run(name, {}); //payload?

}

module.exports.initialize_system_triggers = () => {
    fs.readdirSync(system_triggers).forEach(cont => {
        if (cont.includes('.js')) {
            require('./' + trigger_folder_rel + '/' + cont).register();
        }
    });
}