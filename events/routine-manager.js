const events = require('./events');
const routines = require('../configs/routines.json');

const actions_path = '../actions/'

const register_routines = () => {
    
    for(routine of routines) {
        for(trigger of routine.triggers) {
            events.on(trigger, (payload) => {

                for(action of routine.sequence) {
                    let callback = require(actions_path + action.name); //this is gonna cause issues for sure
                    let param = action.param
                    payload = callback(payload, param);
                }

            });
        }
    }

};

module.exports = {
    register_routines
}