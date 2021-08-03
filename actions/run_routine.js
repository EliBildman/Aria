const { exception } = require('console');
const fs = require('fs');

const routines_file = 'configs/routines.json'
const actions_path = '../actions/'

//{name: str/id: int}
module.exports = (payload, param) => {

    let routine = get_routine(param);
    if(!routine) throw `Could not find routine with ${JSON.stringify(param)}`;

    console.log("[System] Starting routine ID: " + routine.ID);

    return new Promise(async (res, rej) => {
        for(action of routine.sequence) {
            let callback = require(actions_path + action.name); //this is gonna cause issues for sure
            payload = await callback(payload, action.param);
        }
        res(payload);
    });
    
}

const get_routine = (param) => {

    routines = JSON.parse( fs.readFileSync(routines_file) );

    if('ID' in param)
        return routines.find(r => 'ID' in r && r.ID == param.ID);
    else if('name' in param)
        return routines.find(r => r.name && r.name == param.name);
    else
        throw 'Need routine name or id';

}