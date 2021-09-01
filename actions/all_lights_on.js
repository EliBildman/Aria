const lights = require('../controllers/lights-controller');

module.exports = (payload, param) => {
    lights.all_on();
    return payload;
}