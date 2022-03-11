const { Client } = require('tplink-smarthome-api');

const client = new Client();
const devices = {};

const initialize = () => {
    client.startDiscovery().on('device-new', (device) => {
        console.log(`[TP-CONTROLLER]: Registered ${device.alias}`);
        devices[device.alias] = device;
    });
};

//(name: string) => Promise
const _get_power_state = async (name) => {
    if(!devices[name]) {
        throw `"${name}" not in device list`
    }
    return devices[name].getPowerState()
};

const GetPowerState = {
    name: "GetPowerState",
    param: {
        "name": "*string",
        "<on": "*bool"
    },
    run: async (payload, param) => {
        payload.on = await _get_power_state(param.name);
        return payload;
    }
}

//returns names
const _get_connected_devices = () => {
    return Object.keys(devices);
};

const GetConncetedDevices = {
    name: "GetConnectedDevices",
    param: {
        "<names": "*string[]"
    },
    run: (payload, _) => {
        payload.names = _get_connected_devices();
        return payload;
    }
}

//(name: string, on: bool) =>
const _set_power_state = (name, on) => {
    if(!devices[name]) {
        throw `"${name}" not in device list`
    }
    devices[name].setPowerState(on);
};

const SetPowerState = {
    name: "Turn",
    param: {
        "name": "*string",
        "on": "*bool"
    },
    run: (payload, param) => {
        _set_power_state(param.name, param.on);
        return payload;
    }
}


module.exports = {
    name: 'TPPlug',
    initialize,
    events: [],
    actions: [
        GetConncetedDevices,
        SetPowerState,
        GetPowerState,
    ]
}