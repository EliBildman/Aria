const express = require('express');
const router = express.Router();
const fs = require('fs');
const action_manager = require('../managers/action-manager');
const actions_folder = 'actions';




router.get('/', (req, res) => { //maybe one day will save info on each action

    const actions = action_manager.get_actions();

    res.json( Object.keys(actions).map(action => {
        return {
            name: action,
            param: actions[action].param,
        }
    }))

});


module.exports = router;