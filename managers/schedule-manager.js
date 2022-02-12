const cron = require('node-cron');
const run_routine = require('../actions/run_routine');
const fs = require('fs');

//  ----- cron string format -----
//  ┌────────────── second (optional)
//  │ ┌──────────── minute
//  │ │ ┌────────── hour
//  │ │ │ ┌──────── day of month
//  │ │ │ │ ┌────── month
//  │ │ │ │ │ ┌──── day of week
//  │ │ │ │ │ │
//  │ │ │ │ │ │

let cron_events = [];
const schedules_path = 'configs/schedules.json';


module.exports.register_timed_event = (timed_event) => {

    const time_str = timed_event.cron_string;
    cron_events.push(cron.schedule(time_str, (timestamp) => {
        console.log(`[Schedule]: Starting ID: ${timed_event.ID}`);
        for (routine of timed_event.routines) {
            run_routine({ timestamp }, routine);
        }
    }));

}

module.exports.initialize_schedules = () => {

    for (ev of cron_events) {
        ev.stop(); //no way to delete?
    }

    cron_events = [];
    const schedules = this.get_schedules()

    for (timed_event of schedules) {
        this.register_timed_event(timed_event);
    }
}

module.exports.prune_routine = (routine_ID) => {

    const schedules = this.get_schedules();

    for(sched of schedules) {

        const new_routines = [];
        for(routine of sched.routines) {
            if(routine.ID != routine_ID) new_routines.push(routine);
        }
        sched.routines = new_routines;
    }

    fs.writeFileSync(schedules_path, JSON.stringify(schedules));
    this.initialize_schedules();

}

module.exports.get_schedules = () => {
    return JSON.parse(fs.readFileSync(schedules_path));
}

module.exports.create_schedule = (new_sched) => {

    const schedules = this.get_schedules();

    let ID = 0;
    while (schedules.some(ev => ev.ID === ID)) ID++; //super temporary fix for generating IDs
    new_sched.ID = ID;

    schedules.push(new_sched);

    fs.writeFileSync(schedules_path, JSON.stringify(schedules));
    this.initialize_schedules();

}

module.exports.update_schedule = (ID, updated_sched) => {

    const schedules = this.get_schedules();
    const old_sched_ind = schedules.findIndex(ev => ev.ID === ID);

    if (old_sched_ind == -1) {
        throw `Bad id: ${ID}`
    }
    schedules[old_sched_ind] = updated_sched;

    fs.writeFileSync(schedules_path, JSON.stringify(schedules));
    this.initialize_schedules();

}

module.exports.delete_schedule = (ID) => {

    const schedules = this.get_schedules();

    const del_ind = schedules.findIndex(ev => ev.ID == ID);
    schedules.splice(del_ind, 1);

    fs.writeFileSync(schedules_path, JSON.stringify(schedules));
    this.initialize_schedules();

}
