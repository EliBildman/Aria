const { get_routine_runner } = require('../managers/action-manager');

//{name: str}
module.exports = (payload, param) => {
    let routine_id = param.ID;
    const runner = get_routine_runner(routine_id);
    
    return new Promise( async (res, rej) => {
        payload = await runner(payload);
        res(payload);
    });
}