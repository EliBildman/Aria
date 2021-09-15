const fs = require('fs');
const events = require('./events');
const routine_manager = require('./routine-manager');

const events_path = 'configs/events.json';
const trigger_folder = 'events/triggers'
const trigger_folder_rel = 'triggers'

module.exports.register_event = (event) => {

    for (routine of event.routines) {
        const runner = routine_manager.get_routine_runner(routine.ID);
        events.on(event.name, runner);
    }

}

module.exports.initialize_events = () => {

    events.clear_all();

    const saved_events = JSON.parse(fs.readFileSync(events_path));

    for (_event of saved_events) {
        this.register_event(_event);
    }

    fs.readdirSync(trigger_folder).forEach(cont => {
        if (cont.includes('.js')) {
            require('./' + trigger_folder_rel + '/' + cont).register();
        }
    });

};

module.exports.prune_routine = (routine_ID) => {

    const saved_events = get_events();

    for(_event of saved_events) {

        const new_routines = [];
        for(routine of _event.routines) {
            if(routine.ID != routine_ID) new_routines.push(routine);
        }

        _event.routines = new_routines;

    }

    fs.writeFileSync(events_path, JSON.stringify(saved_events));
    this.initialize_events();

}

const get_events = () => {
    return JSON.parse(fs.readFileSync(events_path));
}

module.exports.create_event = (new_event) => {

    const saved_events = get_events();

    let ID = 0;
    while (saved_events.some(ev => ev.ID == ID)) ID++; //super temporary fix for generating IDs
    new_event.ID = ID;

    saved_events.push(new_event);

    fs.writeFileSync(events_path, JSON.stringify(saved_events));
    this.initialize_events();

}

module.exports.update_event = (ID, updated_event) => {

    const saved_events = get_events();

    updated_event.ID = ID;
    const old_event_ind = saved_events.findIndex(ev => ev.ID == ID);
    saved_events[old_event_ind] = updated_event;

    fs.writeFileSync(events_path, JSON.stringify(saved_events));
    this.initialize_events();

}

module.exports.delete_event = (ID) => {

    const saved_events = get_events();

    const del_ind = saved_events.findIndex(ev => ev.ID == ID);
    saved_events.splice(del_ind, 1);

    fs.writeFileSync(events_path, JSON.stringify(saved_events));
    this.initialize_events();

}

module.exports.run_event = (ID) => {

    const saved_events = get_events();

    const name = saved_events.find(e => e.ID == ID).name;
    events.run(name, {}); //payload?

}


// module.exports = {
//     initialize_events,
//     register_event,
//     create_event,
//     update_event,
//     delete_event,
//     run_event,
//     prune_routine
// }