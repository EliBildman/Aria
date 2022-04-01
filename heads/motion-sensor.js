const sensors = [];
const events = require('../events/events');
const { HeadLogger } = require('../loggers');

const logger = HeadLogger('MOTION-SENSOR');

const initialize = () => {};

const set_parameters = (params) => {
    //send parameters to device
};

const take_new_connection = (socket, config) => {
    logger.info(`Registered ${config.name}`);

    sensors.push({
        socket,
        name: config.name,
        hb_interval: config.hb_interval,
    });

    socket.on('ACTIVE', () => {
        events.run('MotionSensor.active', { name: config.name });
    });

    socket.on('INACTIVE', () => {
        events.run('MotionSensor.inactive', { name: config.name });
    });

    socket.on('HEARTBEAT', () => {});
};

module.exports = {
    name: 'MotionSensor',
    initialize,
    take_new_connection,
    events: ['active', 'inactive'],
    actions: [],
};
