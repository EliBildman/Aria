const express = require('express');
const router = express.Router();
const fs = require('fs');
const routine_manager = require('../events/routine-manager');

const routines_path = 'configs/routines.json';

router.get('/', (req, res) => {

    routines = JSON.parse( fs.readFileSync(routines_path) );
    
    const baseURL = 'http://' + req.headers.host + '/';
    const url = new URL(req.url, baseURL);
    const ID = url.searchParams.get('ID');

    if(ID == null) { //if no ID provided, return all routines
        res.json(routines);
    } else {
        const event = routines.find(ev => ev.ID == ID);
        res.json(event);
    }

});


router.post('/', (req, res) => {

    routines = JSON.parse( fs.readFileSync(routines_path) );

    const new_routine = req.body;
    routines.push(new_routine);

    fs.writeFileSync(routines_path, JSON.stringify(routines) );

    res.status(200);
    res.end();

    routine_manager.initialize_routines();

});


router.put('/', (req, res) => {

    routines = JSON.parse( fs.readFileSync(routines_path) );

    const updated_routine = req.body;
    const old_routine_ind = routines.findIndex( r => r.ID == updated_routine.ID );
    routines[old_routine_ind] = updated_routine;

    fs.writeFileSync(routines_path, JSON.stringify(routines) );

    res.status(200);
    res.end();

});


router.delete('/', (req, res) => {

    routines = JSON.parse( fs.readFileSync(routines_path) );

    const baseURL = 'http://' + req.headers.host + '/';
    const url = new URL(req.url, baseURL);
    const ID = url.searchParams.get('ID');

    const del_ind = routines.findIndex( r => r.ID == ID );
    routines.splice(del_ind, 1);

    fs.writeFileSync(routines_path, JSON.stringify(routines) );

    res.status(200);
    res.end();

});


module.exports = router;