const express = require('express');
const router = express.Router();
const fs = require('fs');

const actions_folder = 'actions';


router.get('/', (req, res) => { //maybe one day will save info on each action

    const actions = [];

    fs.readdirSync(actions_folder).forEach(cont => {
        if(cont.includes('.js')) {
            actions.push(cont.substring(0, cont.length - 3));
        }
    });

    res.json(actions);
    
});


module.exports = router;