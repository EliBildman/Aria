const fs = require("fs");
const routine_manager = require("./routine-manager");

const heads = require("../heads/cataloag");

const actions_path = "actions";
const actions_path_rel = "../actions";

// const actions = {};

// module.exports.initialize_actions = () => {
//     fs.readdirSync(actions_path).forEach(cont => {
//         if (cont.includes('.js')) {
//             actions[cont.substring(0, cont.length - 3)] = require('./' + actions_path_rel + '/' + cont); //load in all actions ahead of time
//             // there is for sure a better way to do this
//         }
//     });
// }

module.exports.get_actions = () => {
  return heads.actions;
};

module.exports.get_routine_runner = (routine_id) => {
  return async (payload) => {
    routines = routine_manager.get_routines();

    routine = routines.find((r) => "ID" in r && r.ID == routine_id);
    if (routine == null) throw "what the heck";

    console.log(`[Routines]: Starting "${routine.name}"`);
    for (let action of routine.sequence) {
      const callback = heads.actions[action.name].run;
      payload = await callback(payload, action.param);
      if (payload.END_RUN === true) break;
    }
  };
};
