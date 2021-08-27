const express = require('express');
const router = express.Router();
const fs = require('fs');
const routine_manager = require('../events/routine-manager');

const routine_path = 'configs/routines.json';


router.get('/', (req, res) => {

    routines = JSON.parse( fs.readFileSync(routine_path) );
    
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

    routines = JSON.parse( fs.readFileSync(routine_path) );
    const method = req.body.method;

    if(method == "create") {

        const new_routine = req.body.routine;

        let ID = 0;
        while(routines.some(r=> r.ID == ID)) ID++; //super temporary fix for generating IDs
        new_routine.ID = ID;

        routines.push(new_routine);

        
    } else if (method == "update") {

        const updated_routine = req.body.routine;
        const ID = req.body.ID;
        updated_routine.ID = ID;
        const old_routine_ind = routines.findIndex( r => r.ID == ID );

        routines[old_routine_ind] = updated_routine;
        
    } else if (method == "delete") {
        
        const ID = req.body.ID;

        const del_ind = routines.findIndex( r=> r.ID == ID );
        routines.splice(del_ind, 1);

    } else if (method == "run") {

        const ID = req.body.ID;
        const runner = routine_manager.get_routine_runner(ID);

        runner({});

    }
    
    fs.writeFileSync(routine_path, JSON.stringify(routines) );
    res.status(200);
    res.end();

});


module.exports = router;