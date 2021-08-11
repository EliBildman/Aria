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
    const method = req.body.method;

    if(method == "create") {

        const new_sched = req.body.schedule;

        let ID = 0;
        while(schedules.some(ev => ev.ID == ID)) ID++; //super temporary fix for generating IDs
        new_sched.ID = ID;

        schedules.push(new_sched);

        
    } else if (method == "update") {

        const updated_sched = req.body.schedule;
        const old_sched_ind = schedules.findIndex( ev => ev.ID == updated_sched.ID );
        schedules[old_sched_ind] = updated_sched;
        
    } else if (method == "delete") {
        
        const ID = url.searchParams.get('ID');

        const del_ind = schedules.findIndex( ev => ev.ID == ID );
        schedules.splice(del_ind, 1);

    }
    
    fs.writeFileSync(schedule_path, JSON.stringify(schedules) );
    res.status(200);
    res.end();

    schedule_manager.initialize_schedules();

});


module.exports = router;