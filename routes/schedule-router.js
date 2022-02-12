const express = require('express');
const router = express.Router();
const fs = require('fs');
const schedule_manager = require('../managers/schedule-manager');


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

    const method = req.body.method;

    if(method == "create") {

        schedule_manager.create_schedule(req.body.schedule);
        
    } else if (method == "update") {

        schedule_manager.update_schedule(req.body.ID, req.body.schedule);
        
    } else if (method == "delete") {
        
        schedule_manager.delete_schedule(req.body.ID);

    }
    
    res.status(200);
    res.end();

});


module.exports = router;