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
    cron_events.push( cron.schedule(time_str, (timestamp) => {
        console.log(`[Schedule]: Starting ID: ${timed_event.ID}`);
        for( routine of timed_event.routines ) {
            run_routine({timestamp}, routine);
        }
    }));
}

const initialize_schedules = () => {

    for( ev of cron_events ) {
        ev.stop(); //no way to delete?
    }

    cron_events = [];
    const schedules = JSON.parse( fs.readFileSync(schedules_path) );

    for( timed_event of schedules ) {
        register_timed_event(timed_event);
    }
}

module.exports = {
    initialize_schedules,
    register_timed_event
}