const script_manager = require('../managers/script-manager');

//{ID: int}
module.exports = (payload, param) => {
    script_manager.run_script(param.ID);
    return payload;
};
