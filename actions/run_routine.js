const { exception } = require('console');
const fs = require('fs');
const { get_routine_runner } = require('../events/routine-manager');

const routines_file = 'configs/routines.json'
const actions_path = '../actions/'

//{name: str/id: int}
module.exports = (payload, param) => {

    let routine_id = param.ID;
    const runner = get_routine_runner(routine_id);
    
    return new Promise( async (res, rej) => {
        payload = await runner(payload);
        res(payload);
    });

}