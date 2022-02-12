const { Client } = require('tplink-smarthome-api');

const client = new Client();
const devices = {};

module.exports.initialize = () => {
    client.startDiscovery().on('device-new', (device) => {
        console.log(`[TP-CONTROLLER]: Registered ${device.alias}`);
        devices[device.alias] = device;
    });
};

//(name: string) => Promise
module.exports.get_power_state = (name) => {
    if(!devices[name]) {
        throw `"${name}" not in device list`
    }

    return devices[name].getPowerState();
};

//(name: string, on: bool) =>
module.exports.set_power_state = (name, on) => {
    if(!devices[name]) {
        throw `"${name}" not in device list`
    }

    devices[name].setPowerState(on);
};

//returns names
module.exports.get_connected_devices = () => {
    return Object.keys(devices);
};