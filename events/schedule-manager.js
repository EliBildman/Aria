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

const register_timed_event = (timed_event) => {
    const time_str = timed_event.cron_string;
    cron_events.push(cron.schedule(time_str, (timestamp) => {
        console.log(`[Schedule]: Starting ID: ${timed_event.ID}`);
        for (routine of timed_event.routines) {
            run_routine({ timestamp }, routine);
        }
    }));
}

const initialize_schedules = () => {

    for (ev of cron_events) {
        ev.stop(); //no way to delete?
    }

    cron_events = [];
    const schedules = JSON.parse(fs.readFileSync(schedules_path));

    for (timed_event of schedules) {
        register_timed_event(timed_event);
    }
}

const create_schedule = (new_sched) => {

    const schedules = JSON.parse(fs.readFileSync(schedule_path));

    let ID = 0;
    while (schedules.some(ev => ev.ID == ID)) ID++; //super temporary fix for generating IDs
    new_sched.ID = ID;

    schedules.push(new_sched);

    fs.writeFileSync(schedule_path, JSON.stringify(schedules));
    initialize_schedules();

}

const update_schedule = (ID, updated_sched) => {

    const schedules = JSON.parse(fs.readFileSync(schedule_path));

    const old_sched_ind = schedules.findIndex(ev => ev.ID == ID);
    schedules[old_sched_ind] = updated_sched;

    fs.writeFileSync(schedule_path, JSON.stringify(schedules));
    initialize_schedules();

}

const delete_schedule = (ID) => {

    const schedules = JSON.parse(fs.readFileSync(schedule_path));

    const del_ind = schedules.findIndex(ev => ev.ID == ID);
    schedules.splice(del_ind, 1);

    fs.writeFileSync(schedule_path, JSON.stringify(schedules));
    initialize_schedules();

}

module.exports = {
    initialize_schedules,
    register_timed_event,
    create_schedule,
    update_schedule,
    delete_schedule
}