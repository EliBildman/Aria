const tp_controller = require('../controllers/tp-controller');

module.exports.param = {
    "name": "*string"
}

module.exports.run = (payload, param) => {
    const name = param.name;
    tp_controller.set_power_state(name, false);
    return payload;
}