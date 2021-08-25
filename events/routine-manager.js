const fs = require('fs');

const routines_path = 'configs/routines.json';
const actions_path = '../actions/'


const get_routine_runner = (routine_id) => {

    return async (payload) => {

        routines = JSON.parse(fs.readFileSync(routines_path));

        routine = routines.find(r => 'ID' in r && r.ID == routine_id);
        if (routine == null) throw "what the heck";

        console.log("[Routines]: Starting ID: " + routine.ID);
        for (action of routine.sequence) {
            let callback = require(actions_path + action.name); //this is gonna cause issues for sure
            payload = await callback(payload, action.param);
        }
    }
}


module.exports = {
    get_routine_runner
}