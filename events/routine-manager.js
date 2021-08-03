const events = require('./events');
const routines = require('../configs/routines.json');

const actions_path = '../actions/'

const register_routine = (routine) => {
    for(trigger of routine.triggers) {
        events.on(trigger, get_routine_runner(routine));
    }
}

const initialize_routines = () => {
    
    for(routine of routines) {    
        register_routine(routine);
    }

};

const get_routine_runner = (routine) => {
    return async (payload) => {
        console.log("[System]: Starting routine ID: " + routine.ID);
        for(action of routine.sequence) {
            let callback = require(actions_path + action.name); //this is gonna cause issues for sure
            payload = await callback(payload, action.param);
        }
    }
}

module.exports = {
    initialize_routines,
    register_routine
}