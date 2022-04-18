const events = require('../events');
const { HeadLogger } = require('../loggers');

const logger = HeadLogger('MOTION-SENSOR');

const sensors = {};

const activity_timeout = 30_000;

const initialize = () => {};

const take_new_connection = (socket, config) => {
    logger.info(`Registered ${config.name}`);

    const sensor = {
        socket,
        hb_interval: config.hb_interval,
        active: true,
    };

    socket.on('ACTIVE', () => {
        if (sensor.active)
            events.run('MotionSensor.active', { name: config.name });
    });

    socket.on('INACTIVE', () => {
        if (sensor.active)
            events.run('MotionSensor.inactive', { name: config.name });
    });

    socket.on('HEARTBEAT', () => {});

    sensor.socket.emit('SET_ACTIVITY_TIMEOUT', activity_timeout);

    sensors[config.name] = sensor;
};

const set_active = (sensor_name, active) => {
    if (!(sensor_name in sensor)) {
        logger.warn(`Could not find ${sensor_name} in registered sensors`);
    }
    sensors[sensor_name].active = active;
};

const SetActive = {
    name: 'SetActive',
    param: {
        name: '*string',
    },
    run: (payload, param) => {
        set_active(param.name, true);
        return payload;
    },
};

const SetInactive = {
    name: 'SetInactive',
    param: {
        name: '*string',
    },
    run: (payload, param) => {
        set_active(param.name, false);
        return payload;
    },
};

module.exports = {
    name: 'MotionSensor',
    initialize,
    take_new_connection,
    events: ['active', 'inactive'],
    actions: [SetActive, SetInactive],
};
