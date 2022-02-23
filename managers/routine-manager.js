const fs = require('fs');
const event_manager = require('./event-manager');
const schedule_manager = require('./schedule-manager');
const action_manager = require('./action-manager');

const routine_path = 'data/configs/routines.json';


module.exports.get_routines = () => {
    return JSON.parse(fs.readFileSync(routine_path))
}

const save_routines = (routines) => {
    fs.writeFileSync(routine_path, JSON.stringify(routines));
}


module.exports.create_routine = (new_routine) => {

    let routines = this.get_routines();

    let ID = 0;
    while (routines.some(r => r.ID == ID)) ID++; //super temporary fix for generating IDs
    new_routine.ID = ID;

    routines.push(new_routine);

    save_routines(routines);

}

module.exports.update_routine = (ID, updated_routine) => {

    let routines = this.get_routines();

    updated_routine.ID = ID;
    const old_routine_ind = routines.findIndex(r => r.ID == ID);

    routines[old_routine_ind] = updated_routine;

    save_routines(routines);

}

module.exports.delete_routine = (ID) => {

    let routines = this.get_routines();

    const del_ind = routines.findIndex(r => r.ID == ID);
    routines.splice(del_ind, 1);

    event_manager.prune_routine(ID);
    schedule_manager.prune_routine(ID); //remove this routine from existing events/schedlues

    save_routines(routines);

}

module.exports.run_routine = (ID) => {

    const runner = action_manager.get_routine_runner(ID);
    runner({});

}


// module.exports = {
//     get_routine_runner,
//     create_routine,
//     update_routine,
//     delete_routine,
//     run_routine
// }