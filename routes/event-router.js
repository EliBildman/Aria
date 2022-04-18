const express = require('express');
const router = express.Router();
const fs = require('fs');
const event_manager = require('../managers/event-manager');
const events = require('../events');

router.get('/', (req, res) => {
    const saved_events = event_manager.get_events();

    const baseURL = 'http://' + req.headers.host + '/';
    const url = new URL(req.url, baseURL);
    const ID = url.searchParams.get('ID');

    if (ID == null) {
        //if no ID provided, return all saved_events
        res.json(saved_events);
    } else {
        const event = saved_events.find((ev) => ev.ID == ID);
        res.json(event);
    }
});

router.post('/', (req, res) => {
    const method = req.body.method;

    if (method == 'create') {
        event_manager.create_event(req.body.event);
    } else if (method == 'update') {
        event_manager.update_event(req.body.ID, req.body.event);
    } else if (method == 'delete') {
        event_manager.delete_event(req.body.ID);
    } else if (method == 'run') {
        event_manager.run_event(req.body.ID);
    }

    res.status(200);
    res.end();
});

module.exports = router;
