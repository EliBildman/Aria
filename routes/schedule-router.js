const express = require('express');
const router = express.Router();
const fs = require('fs');
const schedule_manager = require('../events/schedule-manager');

const schedule_path = 'configs/schedules.json';

router.get('/', (req, res) => {

    schedules = JSON.parse( fs.readFileSync(schedule_path) );
    
    const baseURL = 'http://' + req.headers.host + '/';
    const url = new URL(req.url, baseURL);
    const ID = url.searchParams.get('ID');

    if(ID == null) { //if no ID provided, return all scheduled events
        res.json(schedules);
    } else {
        const event = schedules.find(ev => ev.ID == ID);
        res.json(event);
    }

});


router.post('/', (req, res) => {

    schedules = JSON.parse( fs.readFileSync(schedule_path) );

    const new_sched = req.body;
    schedules.push(new_sched);

    fs.writeFileSync(schedule_path, JSON.stringify(schedules) );

    res.status(200);
    res.end();

    schedule_manager.initialize_schedules();

});


router.put('/', (req, res) => {

    schedules = JSON.parse( fs.readFileSync(schedule_path) );

    const updated_sched = req.body;
    const old_sched_ind = schedules.findIndex( ev => ev.ID == updated_sched.ID );
    schedules[old_sched_ind] = updated_sched;

    fs.writeFileSync(schedule_path, JSON.stringify(schedules) );

    res.status(200);
    res.end();

});


router.delete('/', (req, res) => {

    schedules = JSON.parse( fs.readFileSync(schedule_path) );

    const baseURL = 'http://' + req.headers.host + '/';
    const url = new URL(req.url, baseURL);
    const ID = url.searchParams.get('ID');

    const del_ind = schedules.findIndex( ev => ev.ID == ID );
    schedules.splice(del_ind, 1);

    fs.writeFileSync(schedule_path, JSON.stringify(schedules) );

    res.status(200);
    res.end();

});


module.exports = router;