const fs = require('fs');
const event_manager = require('./event-manager');
const schedule_manager = require('./schedule-manager');

const routine_path = 'configs/routines.json';
const actions_path = 'actions';
const actions_path_rel = '../actions'

const actions = [];

fs.readdirSync(actions_path).forEach(cont => {
    if (cont.includes('.js')) {
        actions[cont.substr(0, cont.length - 3)] = require('./' + actions_path_rel + '/' + cont); //load in all actions ahead of time
        // there is for sure a better way to do this
    }
});

module.exports.get_routine_runner = (routine_id) => {

    return async (payload) => {

        routines = JSON.parse(fs.readFileSync(routine_path));

        routine = routines.find(r => 'ID' in r && r.ID == routine_id);
        if (routine == null) throw "what the heck";

        console.log("[Routines]: Starting ID: " + routine.ID);
        for (action of routine.sequence) {
            let callback = actions[action.name];
            payload = await callback(payload, action.param);
        }
    }
}

module.exports.create_routine = (new_routine) => {

    let routines = JSON.parse(fs.readFileSync(routine_path));

    let ID = 0;
    while (routines.some(r => r.ID == ID)) ID++; //super temporary fix for generating IDs
    new_routine.ID = ID;

    routines.push(new_routine);

    fs.writeFileSync(routine_path, JSON.stringify(routines));

}

module.exports.update_routine = (ID, updated_routine) => {

    let routines = JSON.parse(fs.readFileSync(routine_path));

    updated_routine.ID = ID;
    const old_routine_ind = routines.findIndex(r => r.ID == ID);

    routines[old_routine_ind] = updated_routine;

    fs.writeFileSync(routine_path, JSON.stringify(routines));

}

module.exports.delete_routine = (ID) => {

    let routines = JSON.parse(fs.readFileSync(routine_path));

    const del_ind = routines.findIndex(r => r.ID == ID);
    routines.splice(del_ind, 1);

    event_manager.prune_routine(ID);
    schedule_manager.prune_routine(ID); //remove this routine from existing events/schedlues

    fs.writeFileSync(routine_path, JSON.stringify(routines));

}

module.exports.run_routine = (ID) => {

    const runner = get_routine_runner(ID);
    runner({});

}


// module.exports = {
//     get_routine_runner,
//     create_routine,
//     update_routine,
//     delete_routine,
//     run_routine
// }