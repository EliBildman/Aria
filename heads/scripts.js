const script_manager = require('../managers/script-manager');

const initialize = () => {};

const Run = {
    name: "Run",
    param: {
        "ID": "*number",
    },
    run: (payload, param) => {
        script_manager.run_script(param.ID);
        return payload;
    }
}

module.exports = {
    name: 'Scripts',
    initialize,
    events: [],
    actions: [
        Run,
    ],
}