const events = require('./events');
const routines = require('../configs/routines.json');

// console.log(routines)
const actions_path = '../actions/'

const register_routines = () => {
    
    for(routine of routines) {
        for(trigger of routine.triggers) {

            events.on(trigger, (payload) => {
                for(action of routine.sequence) {
                    _callback = require(actions_path + action); //this is gonna cause issues for sure
                    payload = _callback(payload);
                }
            });

        }
    }

};

module.exports = {
    register_routines
}