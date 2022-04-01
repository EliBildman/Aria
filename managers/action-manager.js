const fs = require('fs');
const routine_manager = require('./routine-manager');
const { ManagerLogger } = require('../loggers');

const logger = ManagerLogger('ACTIONS');
const heads = require('../heads/cataloag');

const actions_path = 'actions';
const actions_path_rel = '../actions';

module.exports.get_actions = () => {
    return heads.actions;
};

module.exports.get_routine_runner = (routine_id) => {
    return async (payload) => {
        routines = routine_manager.get_routines();

        routine = routines.find((r) => 'ID' in r && r.ID == routine_id);
        if (routine == null) throw 'what the heck';

        logger.info(`Starting Routine: "${routine.name}"`);
        for (let action of routine.sequence) {
            const callback = heads.actions[action.name].run;
            payload = await callback(payload, action.param);
            if (payload.END_RUN === true) break;
        }
    };
};
