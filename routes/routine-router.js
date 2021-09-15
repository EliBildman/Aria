const e = require('express');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const { eventNames } = require('process');
const routine_manager = require('../events/routine-manager');

const routine_path = 'configs/routines.json';
const events_path = 'configs/events.json'
const schedule_path = 'configs/schedules.json'


router.get('/', (req, res) => {

    let routines = JSON.parse( fs.readFileSync(routine_path) );
    
    const baseURL = 'http://' + req.headers.host + '/';
    const url = new URL(req.url, baseURL);
    const ID = url.searchParams.get('ID');

    if(ID == null) { //if no ID provided, return all routined events
        res.json(routines);
    } else {
        const event = routines.find(r=> r.ID == ID);
        res.json(event);
    }

});


router.post('/', (req, res) => {

    let routines = JSON.parse( fs.readFileSync(routine_path) );
    const method = req.body.method;

    if(method == "create") {

        routine_manager.create_routine(req.body.routine);
        
    } else if (method == "update") {

        routine_manager.update_routine(req.body.ID, req.body.routine);
        
    } else if (method == "delete") {
        
        routine_manager.delete_routine(req.body.ID);

        //need to remove routine from existing events and schedules
        // let events = JSON.parse( fs.readFileSync(events_path) );
        // for(let e of events) {
        //     for(let i = 0; i < e.routines.lenth; i++) {
        //         if(e.routines[i].ID == ID) {
        //             e.routines.splice(i, 1);
        //         }
        //     }
        // }
        // fs.writeFileSync(events_path, JSON.stringify(events) );

        // let schedules = JSON.parse( fs.readFileSync(schedule_path) );
        // for(let s of schedules) {
        //     for(let i = 0; i < s.routines.lenth; i++) {
        //         if(s.routines[i].ID == ID) {
        //             s.routines.splice(i, 1);
        //             console.log(i)
        //         }
        //     }
        // }
        // fs.writeFileSync(schedule_path, JSON.stringify(schedules) );

    } else if (method == "run") {

        const ID = req.body.ID;
        

    }
    
    res.status(200);
    res.end();

});


module.exports = router;