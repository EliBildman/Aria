const fs = require('fs');
const events = require('../events/events');
const routine_manager = require('./routine-manager');
const { v4: uuidv4 } = require('uuid');
const head_catalog = require('../heads/cataloag');

const events_path = 'data/configs/events.json';

const system_triggers = 'events/system-triggers'
const trigger_folder_rel = '../events/system-triggers'

let event_listeners = [];

module.exports.register_event = (event) => {

    const callback = async () => {
        for (routine of event.routines) {
            await routine_manager.run_routine(routine.ID, {event_name: event.name});
        }
    }

    event_listeners.push( events.on(event.name, callback) );

};

module.exports.load_head_events = () => {

    const saved_events = this.get_events();

    for (let event_name of head_catalog.events) {
        if (!saved_events.some(event => event.name === event_name)) {
            this.create_event({
                name: event_name,
                routines: [],
            }, true);
        }
    } 

}

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

module.exports.create_event = (new_event, permenant) => {

    const saved_events = this.get_events();
    new_event.ID = uuidv4();
    new_event.permenant = (permenant ?? false);
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