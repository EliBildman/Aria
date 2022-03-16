const { Client } = require('tplink-smarthome-api');

const client = new Client();
const devices = {};

const state_cache = {};

const initialize = () => {
    client.startDiscovery().on('device-new', (device) => {
        console.log(`[TP-PLUG]: Registered ${device.alias}`);
        devices[device.alias] = device;
    });
};

//(name: string) => Promise
const get_power_state = async (name) => {
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
        payload.on = await get_power_state(param.name);
        return payload;
    }
}

//returns names
const get_connected_devices = () => {
    return Object.keys(devices);
};

const GetConncetedDevices = {
    name: "GetConnectedDevices",
    param: {
        "<names": "*string[]"
    },
    run: (payload, _) => {
        payload.names = get_connected_devices();
        return payload;
    }
}

//(name: string, on: bool) =>
const set_power_state = (name, on) => {
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
        set_power_state(param.name, param.on);
        return payload;
    }
}

//(name: string)
const cache_power_state = async (name) => {
    const state = await get_power_state(name);
    state_cache[name] = state;
}

const CachePowerState = {
    name: "CachePowerState",
    param: {
        "name": "*string",
    },
    run: async (payload, param) => {
        await cache_power_state(param.name);
        return payload;
    }
}

//(name: string)
const restore_chached_state = (name, ignore_off) => {

    if(ignore_off === undefined) ignore_off = false;
    if(state_cache[name] === undefined) {
        console.log(`[TP-PLUG]: Tried to decache value for ${name}, not in cache`);
        return;
    }

    if(!ignore_off) {
        set_power_state(name, state_cache[name]);
    } else {
        if(state_cache[name]) set_power_state(name, true);
    }
    
}

//restores power state from cached value (should be called after CachePowerState)
const RestorePowerState = {
    name: "RestorePowerState",
    param: {
        "name": "*string",
        "ignore_off": "*bool",
    },
    run: (payload, param) => {
        restore_chached_state(param.name, param.ignore_off);
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
        CachePowerState,
        RestorePowerState,
    ]
}