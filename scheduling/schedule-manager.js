const cron = require('node-cron');
const run_routine = require('../actions/run_routine');

//  ----- cron string format -----
//  ┌────────────── second (optional)
//  │ ┌──────────── minute
//  │ │ ┌────────── hour
//  │ │ │ ┌──────── day of month
//  │ │ │ │ ┌────── month
//  │ │ │ │ │ ┌──── day of week
//  │ │ │ │ │ │
//  │ │ │ │ │ │

const schedule = require('../configs/schedule.json');

const register_timed_event = (timed_event) => {
    const time_str = timed_event.cron_string;
    cron.schedule(time_str, (timestamp) => {
        console.log(`[System]': Scheduled event ID: ${timed_event.ID}`);
        for( routine of timed_event.routines ) {
            run_routine({timestamp}, routine);
        }
    });
}

const initialize_schedule = () => {

    for( timed_event of schedule ) {
        register_timed_event(timed_event);
    }

}

module.exports = {
    initialize_schedule,
    register_timed_event
}