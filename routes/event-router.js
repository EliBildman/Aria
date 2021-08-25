const express = require('express');
const router = express.Router();
const fs = require('fs');
const event_manager = require('../events/event-manager');
const events = require('../events/events');

const event_path = 'configs/events.json';

router.get('/', (req, res) => {

    saved_events = JSON.parse( fs.readFileSync(event_path) );
    
    const baseURL = 'http://' + req.headers.host + '/';
    const url = new URL(req.url, baseURL);
    const ID = url.searchParams.get('ID');

    if(ID == null) { //if no ID provided, return all saved_events
        res.json(saved_events);
    } else {
        const event = saved_events.find(ev => ev.ID == ID);
        res.json(event);
    }

});


router.post('/', (req, res) => {

    saved_events = JSON.parse( fs.readFileSync(event_path) );
    const method = req.body.method;

    if(method == "create") {

        const new_event = req.body.event;

        let ID = 0;
        while(saved_events.some(ev => ev.ID == ID)) ID++; //super temporary fix for generating IDs
        new_event.ID = ID;

        saved_events.push(new_event);

        
    } else if (method == "update") {

        const updated_event = req.body.event;
        const ID = req.body.ID;
        updated_event.ID = ID;
        const old_event_ind = saved_events.findIndex( ev => ev.ID == ID );

        saved_events[old_event_ind] = updated_event;
        
    } else if (method == "delete") {
        
        const ID = req.body.ID;

        const del_ind = saved_events.findIndex( ev => ev.ID == ID );
        saved_events.splice(del_ind, 1);

    } else if (method == "run") {

        const ID = req.body.ID;
        const name = saved_events.find(e => e.ID == ID).name;

        events.run(name, {});

    }
    
    fs.writeFileSync(event_path, JSON.stringify(saved_events) );
    res.status(200);
    res.end();

    event_manager.initialize_events();

});


module.exports = router;