const tp_controller = require('../controllers/tp-controller');

module.exports = (payload, param) => {
    const name = param.name;
    tp_controller.set_power_state(name, false);
    return payload;
}