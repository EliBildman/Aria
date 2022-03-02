const script_manager = require('../managers/script-manager');

module.exports.param = {
    "ID": "*number",
}

module.exports.run = (payload, param) => {
    script_manager.run_script(param.ID);
    return payload;
};
